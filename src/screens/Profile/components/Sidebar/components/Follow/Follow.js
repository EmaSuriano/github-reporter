import React from "react";
import { element, number, string } from "prop-types";
import { Box, Text } from "grommet";

const Follow = ({ icon, title, quantity }) => (
  <Box align="center" gap="medium" direction="row">
    <Text>{icon}</Text>
    <Box align="center">
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
  title: string.isRequired,
  quantity: number
};

export default Follow;
