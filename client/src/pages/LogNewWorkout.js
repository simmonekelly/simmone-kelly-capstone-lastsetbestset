import React, { Component } from "react";
import axios from "axios";
import ExerciseList from "../components/ExerciseList";
import ExerciseSearchResults from "../components/ExerciseSearchResults";
import AddedExercise from "../components/AddedExercise";

const BASE_URL = "https://wger.de/api/v2";

export default class LogNewWorkout extends Component {
  state = {
    exerciseList: [],
    search: "",
    searchResults: [],
    addedExercises: []
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
            //how to only call results once stopped typing?
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

  //handles workout selector
  selectWorkout = (id) => {
      const newExerciseToAdd = this.state.exerciseList.filter(exercise => exercise.id === id)
      const currentList = this.state.addedExercises;
      currentList.push(newExerciseToAdd[0])
      this.setState({
          addedExercises: currentList,
          search: "",
          searchResults: []
      })
  }

  render() {
    console.log("rendered");
    //console.log(this.state.exerciseList);
    return !this.state.exerciseList ? null : (
      <section className="d-flex flex-column py-2" style={{ height: "100vh" }}>
        <h1>Log New Workout</h1>
        <form>
            <input
                type="text"
                placeholder="Search Exercise"
                value={this.state.search}
                onChange={(e) => this.handleSearchInputChange(e.target.value)}></input>
        </form>
        {this.state.searchResults.map((exercise =>
            <ExerciseSearchResults exercise={exercise} key={exercise.id} selectWorkout={this.selectWorkout} />
        ))}
        <h3>Added Exercises</h3>
        <p>Date Completed: {new Date().toLocaleString()}</p>
        {this.state.addedExercises.map((addedExercise =>
            <AddedExercise addedExercise={addedExercise} key={addedExercise.id} />
        ))}

        <button>Save Workout</button>
        
      </section>
    );
  }
}
