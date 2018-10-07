import React from "react";
import { Doughnut } from "react-chartjs-2";

import { CHART_CONFIGURATION } from "../../constants";

const Statistics = ({ data, title }) => (
  <div>
    <h1>{title}</h1>
    <Doughnut data={data} {...CHART_CONFIGURATION} />
  </div>
);

export default Statistics;
