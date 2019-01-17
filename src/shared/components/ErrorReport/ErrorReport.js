import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { DEFAULT_ERROR } from '../../constants';

const ErrorReport = ({ description }) => <div>{description}</div>;

ErrorReport.defaultProps = {
  description: DEFAULT_ERROR,
};

ErrorReport.propTypes = {
  description: string,
};

export default ErrorReport;
