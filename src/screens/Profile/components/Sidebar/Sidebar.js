import React from "react";
import { number, string } from "prop-types";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import { GoClock, GoCode, GoLocation, GoMail } from "react-icons/go";
import moment from "moment";
import { Box, Image, Text, Heading } from "grommet";
import styled from "styled-components";

import Follow from "./components/Follow";
import StatsBox from "./components/StatsBox";

const renderIcon = ({ Icon, ...props }) => <Icon size="2rem" {...props} />;

const Wrapper = styled(Box)`
  background-color: #fff;
  border: 1px solid #eee9e9;
  padding: 1rem;
`;

const Avatar = styled(Image)`
  border-radius: 50%;
  height: 15rem;
  width: 15rem;
`;

const HeadingName = styled(Heading)`
  margin-top: 0;
`;

const Sidebar = ({
  avatar,
  bio,
  company,
  createdAt,
  email,
  followers,
  following,
  location,
  name
}) => (
  <Wrapper>
    <Box justify="center" align="center" gap="small">
      <Avatar src={avatar} />
      <HeadingName level={2} size="medium" responsive>
        {name}
      </HeadingName>
      <Text textAlign="center">{bio}</Text>
    </Box>
    <Box
      direction="row"
      justify="center"
      align="center"
      gap="large"
      margin="medium"
    >
      <Follow
        icon={renderIcon({ Icon: FaUserCheck })}
        title="Followers"
        quantity={followers}
      />

      <Follow
        icon={renderIcon({ Icon: FaUserPlus })}
        title="Following"
        quantity={following}
      />
    </Box>
    <Box gap="small">
      <StatsBox
        icon={renderIcon({ Icon: GoClock, size: "3rem" })}
        title={`Joined Github ${moment(createdAt).fromNow()}`}
      />
      <StatsBox
        icon={renderIcon({ Icon: GoMail, size: "3rem" })}
        title={email}
      />
      <StatsBox
        icon={renderIcon({ Icon: GoCode, size: "3rem" })}
        title={company}
      />
      <StatsBox
        icon={renderIcon({ Icon: GoLocation, size: "3rem" })}
        title={location}
      />
    </Box>
  </Wrapper>
);

Sidebar.propTypes = {
  avatar: string.isRequired,
  bio: string,
  company: string,
  createdAt: string,
  email: string,
  followers: number.isRequired,
  following: number.isRequired,
  location: string.isRequired,
  name: string.isRequired
};

export default Sidebar;
