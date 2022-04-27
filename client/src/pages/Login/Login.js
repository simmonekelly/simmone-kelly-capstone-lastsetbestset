import React, { Component } from "react";
import "../Login/Login.scss";
import axios from "axios";
import SignUpComponent from "../../components/SignUpComponent";
import LoginComponent from "../../components/LoginComponent";
const baseUrl = "http://localhost:8080";
const loginUrl = `${baseUrl}/auth/login`;
const signupUrl = `${baseUrl}/auth/signup`;

export default class Login extends Component {
  state = {
    isSignedUp: false,
    isLoggedIn: false,
    isLoginError: false,
    errorMessage: "",
  };

  componentDidMount() {
      if (this.props.isSignedUp) {
          this.setState({
              isSignedUp: this.props.isSignedUp
          })
      }
  }


  handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(loginUrl, {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        window.location.replace("/myprofile");
      })
      .catch((err) => {
        console.log(err);
        this.setState({ isLoginError: true, errorMessage: err });
      });
  };

  handleSignup = (e) => {
    e.preventDefault();

    axios
      .post(signupUrl, {
        name: e.target.name.value,
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((response) => {
        this.setState({
          isSignedUp: true,
        });
        //sessionStorage.
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { isLoggedIn, isSignedUp } = this.state;
    
    return !isSignedUp ? (
      <section className="logsignin">
        <SignUpComponent handleSignup={this.handleSignup} />
      </section>
    ) : (
      <section className="logsignin">
        <LoginComponent handleLogin={this.handleLogin} />
      </section>
    );
  }
}
