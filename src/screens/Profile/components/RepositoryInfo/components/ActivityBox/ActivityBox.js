import React from "react";
import { element, number, string } from "prop-types";

const ActivityBox = ({ icon, stat, title }) => (
  <div className="activity--stats activity--box">
    {icon}
    <h1 className="stats--number">{stat}</h1>
    <span className="stats--title">{title}</span>
  </div>
);

ActivityBox.propTypes = {
  icon: element.isRequired,
  stat: number.isRequired,
  title: string.isRequired
};

export default ActivityBox;
