import { concat, isEmpty } from "ramda";
import { getEdges, getPageInfo, updateRepositoryData } from "../../utils";

const updateQuery = (previousResult, { fetchMoreResult }) => {
  const oldEdges = getEdges(previousResult);
  const newEdges = getEdges(fetchMoreResult);
  const pageInfo = getPageInfo(fetchMoreResult);
  const edges = concat(oldEdges, newEdges);
  const updatedData = updateRepositoryData(previousResult, edges, pageInfo);

  return isEmpty(newEdges) ? previousResult : updatedData;
};

export default updateQuery;
