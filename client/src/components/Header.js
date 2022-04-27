import { Link } from "react-router-dom";
import React, { Component } from "react";
import axios from "axios";

const baseUrl = "http://localhost:8080";
const logoutUrl = `${baseUrl}/auth/logout`;

export default class Header extends Component {
  state = {
    isLoggedIn: true,
  };

  componentDidMount() {
    const token = sessionStorage.getItem("token");

    if (!token) {
      this.setState({
        isLoggedIn: false,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const token = sessionStorage.getItem("token");

    if (token) {
      this.setState({
        isLoggedIn: true,
      });
    }
  }

  handleLogOut = () => {
    axios
      .post(logoutUrl, {})
      .then((response) => {
        sessionStorage.setItem("token", "");
        this.setState({
          isLoggedIn: false,
        });
      })
      .catch((err) => console.log(err));
  };

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
          {this.state.isLoggedIn ? (
            <ul className="header_nav">
              <Link to="/myprofile">
                <li>Dashboard</li>
              </Link>
              <Link to="/log-new-workout">
                <li>Start New Workout</li>
              </Link>
              <Link to="/" onClick={(e) => this.handleLogOut(e)}>
                <li>Log Out</li>
              </Link>
            </ul>
          ) : (
            <ul className="header_nav">
              <Link to="/signup">
                <li>Sign Up</li>
              </Link>
              <Link to="/login">
                <li>Login</li>
              </Link>
            </ul>
          )}
        </div>
      </section>
    );
  }
}
