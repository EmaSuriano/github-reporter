import React from "react";
import { element, string } from "prop-types";

const StatsBox = ({ icon, title }) => (
  <section className="sidebar--extra-info">
    <span>{icon}</span>
    <h3 className="extra-info-title">{title}</h3>
  </section>
);

StatsBox.defaultProps = {
  quantity: 0
};

StatsBox.propTypes = {
  icon: element.isRequired,
  title: string
};

export default StatsBox;
