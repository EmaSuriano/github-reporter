import React from "react";
import { arrayOf, number, shape, string } from "prop-types";
import { isEmpty } from "ramda";
import { Doughnut } from "react-chartjs-2";
import { Box, Text } from "grommet";
import styled from "styled-components";

import NoDataFound from "../NoDataFound";

const StatisticsBox = styled(Box)`
  background-color: #ffffff;
  border: 1px solid #eee9e9;
  border-radius: 0.5rem;
`;

const Statistics = ({ configuration, data, id, title }) => (
  <StatisticsBox justify="center" align="center" gap="medium">
    <Text>{title}</Text>
    {isEmpty(data.labels) ? (
      <NoDataFound />
    ) : (
      <Doughnut id={id} data={data} {...configuration} />
    )}
  </StatisticsBox>
);

Statistics.defaultProps = {
  title: ""
};

Statistics.propTypes = {
  data: shape({
    labels: arrayOf(string),
    datasets: arrayOf(
      shape({
        backgroundColor: arrayOf(string),
        data: arrayOf(number)
      })
    )
  }),
  id: string,
  title: string
};

export default Statistics;
