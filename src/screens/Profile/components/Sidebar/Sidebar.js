import React from "react";
import { number, string } from "prop-types";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";

import Follow from "../Follow";

const Sidebar = ({ avatar, bio, followers, following, name }) => (
  <section className="content--sidebar">
    <div className="sidebar--header">
      <div className="sidebar--avatar">
        <img alt="Avatar" src={avatar} />
      </div>
      <div className="sidebar--info">
        <h1 className="sidebar--info__title">{name}</h1>
        <span className="sidebar--info__bio">{bio}</span>
      </div>
      <div className="sidebar--following">
        <Follow
          icon={<FaUserCheck size="2rem" />}
          title="Followers"
          quantity={followers}
        />

        <Follow
          icon={<FaUserPlus size="2rem" />}
          title="Following"
          quantity={following}
        />
      </div>
    </div>
  </section>
);

Sidebar.propTypes = {
  avatar: string.isRequired,
  bio: string.isRequired,
  name: string.isRequired,
  followers: number.isRequired,
  following: number.isRequired
};

export default Sidebar;
