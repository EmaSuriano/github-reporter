import React from "react";
import { arrayOf, number, shape, string } from "prop-types";
import { isEmpty } from "ramda";
import { Doughnut } from "react-chartjs-2";

import NoDataFound from "../NoDataFound";

const Statistics = ({ data, configuration, title }) => (
  <div className="statistic--box">
    {isEmpty(data.labels) ? (
      <NoDataFound />
    ) : (
      <Doughnut data={data} {...configuration} />
    )}
  </div>
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
  })
};

export default Statistics;
