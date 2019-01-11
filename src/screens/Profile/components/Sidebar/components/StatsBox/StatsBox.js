import React from "react";
import { element, string } from "prop-types";
import { Box, Text } from "grommet";

const StatsBox = ({ icon, title }) => (
  <Box direction="row" align="center" gap="small" basis="300px">
    <Box>{icon}</Box>
    <Text>{title}</Text>
  </Box>
);

StatsBox.defaultProps = {
  quantity: 0
};

StatsBox.propTypes = {
  icon: element.isRequired,
  title: string
};

export default StatsBox;
