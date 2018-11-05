import React from "react";
import { element, number, string } from "prop-types";

const Follow = ({ icon, title, quantity }) => (
  <div className="follow-box">
    <span className="follow-icon">{icon}</span>
    <div className="follow-stat">
      <h3 className="follow-stat--number">{quantity}</h3>
      <span className="follow-stat--text">{title}</span>
    </div>
  </div>
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
