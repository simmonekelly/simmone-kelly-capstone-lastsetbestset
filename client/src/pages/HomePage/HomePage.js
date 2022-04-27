import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../HomePage/HomePage.scss";

export default class HomePage extends Component {
  state = {
    exerciseList: [],
    search: "",
    searchResults: [],
  };

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <section className="home">
        <div className="home_content-container">
          <div className="home_content">
            <h1>Last Set Best&nbsp;Set</h1>
            {/* <h3>Your New Favorite Way To Log Your Workouts</h3> */}
            <h3>Log Your Workouts. Get Stronger.</h3>
            {/* <p>Break through any platau and hit those strength goals!</p> */}
            <p>
              Optimize your strength progression by logging your workouts.
              Take the guess work out of trying to rely on your memory and keeping
              all those numbers in your head, and have them all neatly listed out for you
              in most recent training order.
              By keeping track of your training loads week to week, you can
              more easily apply progressive overload to any training program,
              helping you break through training&nbsp;plataus.

            </p>
            <div className="home_buttons-container">
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
              <Link to="/login">
                <button>Login</button>
              </Link>
            </div>
          </div>
         </div>
      </section>
    );
  }
}
