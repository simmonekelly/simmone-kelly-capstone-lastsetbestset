import { Link } from "react-router-dom";
import React, { Component } from "react";

export default class Header extends Component {
  state = {
    isLoggedIn: true,
  };

  componentDidMount() {
    console.log("header mounted");
    const token = sessionStorage.getItem("token");
    console.log(token);

    if (!token) {
      this.setState({
        isLoggedIn: false,
      });
    }
  }

  componentDidUpdate() {
    console.log("header updated");
    const token = sessionStorage.getItem("token");
    console.log(token);

    if (token) {
      this.setState({
        isLoggedIn: true,
      });
    }
  }

  render() {
    return (
      <section className="header">
        <Link to="/">
          <img
            alt="logo"
            className="header_logo"
            src="http://localhost:8080/images/lsbs-logo.png"
          />
        </Link>
        <div className="header_nav-container">
          <ul className="header_nav">
            <Link to="/myprofile">
              <li>Dashboard</li>
            </Link>
            <Link to="/log-new-workout">
              <li>Start New Workout</li>
            </Link>
            {this.state.isLoggedIn ? (
            <Link to="/">
              <li>Log Out</li>
            </Link>
            ) : (
              <Link to="/login">
              <li>Log In</li>
            </Link>
            )}
          </ul>
        </div>
      </section>
    );
  }
}
