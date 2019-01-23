import React from 'react';
import { number, string } from 'prop-types';
import { FaUserCheck, FaUserPlus } from 'react-icons/fa';
import { GoClock, GoCode, GoLocation, GoMail } from 'react-icons/go';
import moment from 'moment';
import { Box, Heading, Image, Text } from 'grommet';
import styled from 'styled-components';
import Fade from 'react-reveal/Fade';

import Follow from './components/Follow';
import StatsBox from './components/StatsBox';

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

const Sidebar = ({
  avatar,
  bio,
  company,
  createdAt,
  email,
  followers,
  following,
  location,
  name,
}) => (
  <Fade left ssrFadeout>
    <Wrapper>
      <Box justify="center" align="center" gap="small">
        <Avatar src={avatar} />
        <Heading level={2} size="medium" margin={{ top: 0 }}>
          {name}
        </Heading>
        {bio && (
          <Text textAlign="center" margin="medium">
            {bio}
          </Text>
        )}
      </Box>
      <Box direction="row" justify="center" align="center" gap="large" margin="medium">
        <Follow icon={<FaUserCheck size="2rem" />} title="Followers" quantity={followers} />

        <Follow icon={<FaUserPlus size="2rem" />} title="Following" quantity={following} />
      </Box>
      <Box gap="small" direction="row" wrap>
        <StatsBox
          icon={<GoClock size="2.5rem" />}
          title={`Joined Github ${moment(createdAt).fromNow()}`}
        />
        {email && <StatsBox icon={<GoMail size="2.5rem" />} title={email} />}
        {company && <StatsBox icon={<GoCode size="2.5rem" />} title={company} />}
        {location && <StatsBox icon={<GoLocation size="2.5rem" />} title={location} />}
      </Box>
    </Wrapper>
  </Fade>
);

Sidebar.propTypes = {
  avatar: string.isRequired,
  followers: number.isRequired,
  following: number.isRequired,
  name: string.isRequired,
  createdAt: string.isRequired,
  location: string,
  bio: string,
  company: string,
  email: string,
};

export default Sidebar;
