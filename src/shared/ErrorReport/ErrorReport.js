import React from "react";
import { string } from "prop-types";

import { DEFAULT_ERROR } from "../constants";

const ErrorReport = ({ description }) => (
  <div className="error-box">{description}</div>
);

ErrorReport.defaultProps = {
  description: DEFAULT_ERROR
};

ErrorReport.propTypes = {
  description: string
};

export default ErrorReport;
