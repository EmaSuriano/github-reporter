import React from "react";
import { arrayOf, number, shape, string } from "prop-types";
import { isEmpty } from "ramda";
import { Doughnut } from "react-chartjs-2";

import NoDataFound from "../NoDataFound";

const Statistics = ({ configuration, data, id, title }) => (
  <div className="statistic--box">
    <h1 className="statistic--box-title">{title}</h1>
    {isEmpty(data.labels) ? (
      <NoDataFound />
    ) : (
      <Doughnut id={id} data={data} {...configuration} />
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
  }),
  id: string,
  title: string
};

export default Statistics;
