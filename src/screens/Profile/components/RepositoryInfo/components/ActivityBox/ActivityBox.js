import React from "react";
import { element, number, string } from "prop-types";
import { Box, Text } from "grommet";
import styled from "styled-components";

const StyledBox = styled(Box)`
  background-color: #fff;
  border: 1px solid #eee9e9;
  border-radius: 0.5rem;
  min-width: 210px;
  min-height: 70px;
`;

const ActivityBox = ({ icon, stat, title }) => (
  <StyledBox
    direction="row"
    align="center"
    justify="center"
    pad="small"
    margin="xsmall"
  >
    {icon}
    <Box align="center" justify="center" pad="small">
      <Text>{stat}</Text>
      <Text>{title}</Text>
    </Box>
  </StyledBox>
);

ActivityBox.propTypes = {
  icon: element.isRequired,
  stat: number,
  title: string.isRequired
};

export default ActivityBox;
