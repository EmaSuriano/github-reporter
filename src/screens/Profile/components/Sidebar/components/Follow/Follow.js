import React from "react";
import { element, number, string } from "prop-types";
import { Box, Text } from "grommet";

const Follow = ({ icon, title, quantity }) => (
  <Box direction="row" align="center" gap="medium">
    <Text>{icon}</Text>
    <Box>
      <Text>{quantity}</Text>
      <Text>{title}</Text>
    </Box>
  </Box>
);

Follow.defaultProps = {
  quantity: 0
};

Follow.propTypes = {
  icon: element.isRequired,
  quantity: number,
  title: string.isRequired
};

export default Follow;
