import React from "react";
import { FaSearch } from "react-icons/fa";

const Header = () => (
  <section className="profile--header">
    <h1 className="header--title">Reporter</h1>
    <div className="input-search">
      <input type="text" placeholder="Search user" />
      <span className="input-search--button">
        <FaSearch size="2rem" />
      </span>
    </div>
  </section>
);

export default Header;
