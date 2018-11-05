import React from "react";
import { number, string } from "prop-types";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";
import { GoClock, GoCode, GoMail } from "react-icons/go";
import moment from "moment";

import Follow from "./components/Follow";
import StatsBox from "./components/StatsBox";

const renderIcon = ({ Icon, ...props }) => <Icon size="2rem" {...props} />;

const Sidebar = ({
  avatar,
  bio,
  company,
  createdAt,
  email,
  followers,
  following,
  name
}) => (
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
          icon={renderIcon({ Icon: FaUserCheck })}
          title="Followers"
          quantity={followers}
        />

        <Follow
          icon={renderIcon({ Icon: FaUserPlus })}
          title="Following"
          quantity={following}
        />
      </div>
      <div className="algo">
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
      </div>
    </div>
  </section>
);

Sidebar.propTypes = {
  avatar: string.isRequired,
  bio: string,
  company: string,
  createdAt: string,
  email: string,
  followers: number.isRequired,
  following: number.isRequired,
  name: string.isRequired
};

export default Sidebar;
