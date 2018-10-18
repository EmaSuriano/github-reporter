import React from "react";
import { element, number, string } from "prop-types";

const Follow = ({ icon, title, quantity }) => (
  <div className="follow-box">
    <span className="follow-icon">{icon}</span>
    <h3 className="follow-number">{quantity}</h3>
    <span className="follow-text">{title}</span>
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
