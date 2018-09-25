import React from "react";
import { compose, concat, isEmpty } from "ramda";
import { Query } from "react-apollo";

import { GET_REPOSITORIES_INFORMATION } from "./query";
import {
  getEdges,
  getEndCursor,
  getPageInfo,
  hasNextPage,
  updateRepositoryData
} from "../../utils";

const RepositoryInfo = ({ id, login }) => (
  <Query query={GET_REPOSITORIES_INFORMATION} variables={{ name: login, id }}>
    {({ data, error, fetchMore, loading }) => {
      if (loading) return "Loading..";
      if (error) return "Error";

      fetchMore({
        query: GET_REPOSITORIES_INFORMATION,
        variables: {
          name: login,
          id,
          cursor: compose(
            getEndCursor,
            getPageInfo
          )(data)
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const oldEdges = getEdges(previousResult);
          const newEdges = getEdges(fetchMoreResult);
          const pageInfo = getPageInfo(fetchMoreResult);
          const edges = concat(oldEdges, newEdges);
          const updatedData = updateRepositoryData(
            previousResult,
            edges,
            pageInfo
          );

          return isEmpty(newEdges) ? previousResult : updatedData;
        }
      });

      const nextPage = compose(
        hasNextPage,
        getPageInfo
      )(data);

      if (nextPage) return "Analyzing Profile";

      return <h1>Profile</h1>;
    }}
  </Query>
);

export default RepositoryInfo;
