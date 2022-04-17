import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <section className="header">
      <Link to="/">
        <img alt="logo" src="" />
      </Link>
      <div className="header_nav-container">
        <ul className="header_nav">
          <Link to="/myprofile">
            <li>Dashboard</li>
          </Link>
          <Link to="/log-new-workout">
            <li>Start New Workout</li>
          </Link>
          <Link to="/">
            <li>Log Out</li>
          </Link>
        </ul>
      </div>
    </section>
  );
}

export default Header;
