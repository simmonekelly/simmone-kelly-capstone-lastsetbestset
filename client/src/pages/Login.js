import React, { Component } from "react";
//import Profile from './pages/Profile';
import axios from "axios";

const baseUrl = "http://localhost:8080";
const loginUrl = `${baseUrl}/auth/login`;
const signupUrl = `${baseUrl}/signup`;

export default class Login extends Component {
  state = {
    isSignedUp: false,
    isLoggedIn: false,
    isLoginError: false,
    errorMessage: "",
  };

  handleLogin = (e) => {
    e.preventDefault();
    console.log("login submitted")
    console.log(e.target.username.value);
    axios
      .post("http://localhost:8080/auth/login", {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((response) => {
        console.log(response);
        //sessionStorage.setItem("token", response.data.token);
        //this.setState({
        //  isLoggedIn: true,
        //});
      })
      .catch((err) => {
        console.log(err);
        //this.setState({ isLoginError: true, errorMessage: err });
      });
  };

  // handleSignup = (e) => {
  //     e.preventDefault();
  //     axios
  //       .post(signupUrl, {
  //         name: e.target.name.value,
  //         username: e.target.username.value,
  //         password: e.target.password.value,
  //       })
  //       .then((response) => {
  //         console.log(response);
  //         this.setState({
  //           isSignedUp: true,
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //   };

  render() {
    // const { isLoggedIn, isSignedUp } = this.state;

    // // Handle the Signup/Login
    // if (!isSignedUp) return this.renderSignUp();
    // if (!isLoggedIn) return this.renderLogin();

    return (
      <div>
        <h1>Sign In Below</h1>
        <form onSubmit={this.handleLogin}>
          <div className="">
            Username: <input type="text" name="username" />
          </div>
          {/* <div className="">
            Name: <input type="text" name="name" />
          </div> */}
          <div className="">
            Password:{" "}
            <input type="password" name="password" autoComplete="true" />
          </div>
          <button className="" type="submit">
            Sign In
          </button>
        </form>
      </div>
    );
  }
}
