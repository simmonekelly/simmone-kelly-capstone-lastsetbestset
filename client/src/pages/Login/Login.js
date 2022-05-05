import React, { Component } from "react";
import "../Login/Login.scss";
import axios from "axios";
import SignUpComponent from "../../components/SignUpComponent";
import LoginComponent from "../../components/LoginComponent";
const baseUrl = "https://lastsetbestset-server.herokuapp.com";
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
        isSignedUp: this.props.isSignedUp,
      });
    }
  }

  componentDidUpdate(_, prevState) {

    if (this.props.isSignedUp != prevState.isSignedUp) {
      this.setState({
        isSignedUp: this.props.isSignedUp,
      });
    }
    if(this.state.errorMessage) {
      alert(this.state.errorMessage)
    }
  }

  handleLogin = (e) => {
    e.preventDefault();

    if (
      !e.target.username.value ||
      !e.target.password.value
    ) {
      alert("Please fill out required fields");
    } else {
      axios
      .post(loginUrl, {
        username: e.target.username.value,
        password: e.target.password.value,
      })
      .then((response) => {
        console.log(response)
        sessionStorage.setItem("token", response.data.token);
        window.location.replace("/myprofile");
      })
      .catch((err) => {
        alert(err.response.data.message)
       });
    }
  };

  handleSignup = (e) => {
    e.preventDefault();

    if (
      !e.target.name.value ||
      !e.target.username.value ||
      !e.target.password.value
    ) {
      alert("Please fill out required fields");
    } else {
      axios
        .post(signupUrl, {
          name: e.target.name.value,
          username: e.target.username.value,
          password: e.target.password.value,
        })
        .then((res) => {
            this.setState({
              isSignedUp: true,
            });
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    }
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
