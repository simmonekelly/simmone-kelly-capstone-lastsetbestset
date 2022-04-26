import React, { Component } from "react";
import axios from "axios";
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

              {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec
              ultricies dolor, vitae congue nulla. Morbi felis augue, aliquet ac
              enim sed, sodales mollis mauris. Proin posuere porta ornare.
              Suspendisse dictum elit vel pharetra mollis. Vivamus maximus, leo
              convallis euismod ornare, neque leo consectetur nisi, ut fermentum
              tellus dolor viverra justo. Integer accumsan, ligula id lobortis
              commodo, metus ex semper augue, sed feugiat velit velit eget
              risus. Praesent a eros eleifend, dictum nisi sed, gravida nisl.
              Aenean ac finibus odio. Fusce viverra nibh odio, non euismod odio
              molestie in. Nullam rutrum varius commodo. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia curae;
              Quisque dapibus libero id rhoncus placerat. Integer hendrerit
              dolor neque. Maecenas eget leo in metus tempor tempus. */}
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
          {/* <img  className="home_hero-image" src={"http://localhost:8080/images/pexels-victor-freitas-703016.jpg"} alt="image" /> */}
        </div>
        {/* <p> MOVE TO AN ABOUT US PAGE
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec
              ultricies dolor, vitae congue nulla. Morbi felis augue, aliquet ac
              enim sed, sodales mollis mauris. Proin posuere porta ornare.
              Suspendisse dictum elit vel pharetra mollis. Vivamus maximus, leo
              convallis euismod ornare, neque leo consectetur nisi, ut fermentum
              tellus dolor viverra justo. Integer accumsan, ligula id lobortis
              commodo, metus ex semper augue, sed feugiat velit velit eget
              risus. Praesent a eros eleifend, dictum nisi sed, gravida nisl.
              Aenean ac finibus odio. Fusce viverra nibh odio, non euismod odio
              molestie in. Nullam rutrum varius commodo. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia curae;
              Quisque dapibus libero id rhoncus placerat. Integer hendrerit
              dolor neque. Maecenas eget leo in metus tempor tempus.
        </p> */}
      </section>
    );
  }
}
