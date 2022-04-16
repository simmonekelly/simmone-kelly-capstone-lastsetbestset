import React, { Component } from "react";
//import Profile from './pages/Profile';
import axios from "axios";
import SignUpComponent from "../components/SignUpComponent";
import LoginComponent from "../components/LoginComponent";
import Dashboard from "../pages/Dashboard";
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
      console.log("sign up mounted");
      if (this.props.isSignedUp) {
          this.setState({
              isSignedUp: this.props.isSignedUp
          })
      }
  }


  handleLogin = (e) => {
    e.preventDefault();
    console.log("login submitted");
    console.log(e.target.username.value);
    axios
      .post(loginUrl, {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((response) => {
        console.log(response);
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

    console.log("signup submitted");
    axios
      .post(signupUrl, {
        name: e.target.name.value,
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((response) => {
        console.log(response);
        this.setState({
          isSignedUp: true,
        });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { isLoggedIn, isSignedUp } = this.state;
    console.log(`props: ${this.props.isSignedUp}`)
    console.log(`is signed up: ${isSignedUp}`);
    console.log(`is logged in: ${isLoggedIn}`);
    
    return !isSignedUp ? (
      <SignUpComponent handleSignup={this.handleSignup} />
    ) : (
      <LoginComponent handleLogin={this.handleLogin} />
    );
  }
}
