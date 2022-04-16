import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom"

export default class HomePage extends Component {
  state = {
    exerciseList: [],
    search: "",
    searchResults: [],
  };

  componentDidMount() {
    console.log("home page mounted");
  }

  componentDidUpdate() {
    console.log(" home page updated");
  }

  render() {
    return (
      <section>
        <div className="home_content-container">
          <div>
            <h1>Last Set Best Set</h1>
            <p>
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
            </p>
          </div>
          <img  className="home_hero-image" src={"http://localhost:8080/images/pexels-victor-freitas-703016.jpg"} alt="image" />
        </div>
        <p>
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
        </p>
        <Link to="/login">
        <button>Login</button>
        </Link>
        <Link to="/signup">
        <button>Sign Up</button>
        </Link>
      </section>
    );
  }
}
