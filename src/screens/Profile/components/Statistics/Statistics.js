import React from "react";
import { arrayOf, number, shape, string } from "prop-types";
import { Doughnut } from "react-chartjs-2";

const Statistics = ({ data, configuration, title }) => (
  <div className="profile--box">
    <h1>{title}</h1>
    <Doughnut data={data} {...configuration} />
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
        data: arrayOf(number),
        hoverBackgroundColor: arrayOf(string)
      })
    )
  })
};

export default Statistics;
