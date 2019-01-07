import React from "react";
import { element, number, string } from "prop-types";
import { Box, Text, ResponsiveContext } from "grommet";

import { getDirection } from "../../../../utils/helpers";

const Follow = ({ icon, title, quantity }) => (
  <ResponsiveContext.Consumer>
    {size => (
      <Box
        responsive
        direction={getDirection(size)}
        align="center"
        gap="medium"
      >
        <Text>{icon}</Text>
        <Box responsive align="center">
          <Text>{quantity}</Text>
          <Text>{title}</Text>
        </Box>
      </Box>
    )}
  </ResponsiveContext.Consumer>
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
