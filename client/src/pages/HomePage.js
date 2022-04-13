import React, { Component } from "react";
import axios from "axios";
import ExerciseList from "../components/ExerciseList";
import ExerciseSearchResults from "../components/ExerciseSearchResults";

const BASE_URL = "https://wger.de/api/v2";

export default class HomePage extends Component {
  state = {
    exerciseList: [],
    search: "",
    searchResults: [],
  };

  componentDidMount() {

    const options = {
      method: "GET",
      url: "https://exercisedb.p.rapidapi.com/exercises",
      headers: {
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
        "X-RapidAPI-Key": "d9e03fdda1mshb3be7c734128a94p1339e8jsn02c1ef35f74d",
      },
    };

    axios
      .request(options)
      .then((res) => {
        //console.log(res.data);
        this.setState({
          exerciseList: res.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidUpdate(prevProps,prevState) {
    console.log("updated");
    //condition to check previous state to stop infinite loop for search results
    if (!this.state.search) {
      console.log("no search");
      return;
    } else {
        
      console.log( `previous state: ${prevState.search}`)
      console.log(`current state ${this.state.search}`)
      if (this.state.search === prevState.search){
          console.log('matches')
      } else{
      console.log("running search");

      const options = {
        method: "GET",
        url: `https://exercisedb.p.rapidapi.com/exercises/name/${this.state.search}`,
        headers: {
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          "X-RapidAPI-Key":
            "d9e03fdda1mshb3be7c734128a94p1339e8jsn02c1ef35f74d",
        },
      };

      axios
        .request(options)
        .then((res) => {
          console.log(res.data);
          this.setState({
            searchResults: res.data,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
    }
  }

  //handles search bar input change
  handleSearchInputChange = (text) => { 
      console.log(text)
    this.setState({
        search: text,
    })
  }

  render() {
    console.log("rendered");
    //console.log(this.state.exerciseList);
    return !this.state.exerciseList ? null : (
      <div className="d-flex flex-column py-2" style={{ height: "100vh" }}>
        <h1>Home Page</h1>
        <form>
            <input
                type="text"
                placeholder="Search Exercise"
                value={this.state.search}
                onChange={(e) => this.handleSearchInputChange(e.target.value)}></input>
        </form>
        {this.state.searchResults.map((exercise =>
            <ExerciseSearchResults exercise={exercise} key={exercise.id} />
        ))}
      </div>
    );
  }
}
