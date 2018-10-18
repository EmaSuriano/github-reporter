import React from "react";
import { string } from "prop-types";
import { FaUserCheck, FaUserPlus } from "react-icons/fa";

import Follow from "../Follow";

const Sidebar = ({ avatar }) => (
  <section className="content--sidebar">
    <div className="sidebar--header">
      <div className="sidebar--avatar">
        <img alt="Avatar" src={avatar} />
      </div>
      <div className="sidebar--info">
        <h1 className="sidebar--info__title">Welcome Wesbos</h1>
        <span className="sidebar--info__location">Super Admin</span>
      </div>
      <div className="sidebar--following">
        <Follow
          icon={<FaUserCheck size="2rem" />}
          title="Followers"
          quantity={213213}
        />

        <Follow
          icon={<FaUserPlus size="2rem" />}
          title="Following"
          quantity={342234}
        />
      </div>
    </div>
  </section>
);

Sidebar.propTypes = {
  avatar: string.isRequired
};

export default Sidebar;
