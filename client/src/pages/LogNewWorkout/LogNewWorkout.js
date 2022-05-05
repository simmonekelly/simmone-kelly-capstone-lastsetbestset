import React, { Component } from "react";
import axios from "axios";
import ExerciseSearchResults from "../../components/ExerciseSearchResults";
import AddedExercise from "../../components/AddedExercise";
import "./LogNewWorkout.scss";
import { Link } from "react-router-dom";

const BASE_URL = "https://lastsetbestset-server.herokuapp.com";

export default class LogNewWorkout extends Component {
  state = {
    exerciseList: [],
    search: "",
    searchResults: [],
    addedExercises: [],
    token: "",
    isLoggedIn: true,
    workoutHistory: []
  };

  async componentDidMount() {
    const token = sessionStorage.getItem("token");

    if (!token) {
      this.setState({
        isLoggedIn: false,
      });
    } else {
      const options = {
        method: "GET",
        url: "https://exercisedb.p.rapidapi.com/exercises",
        headers: {
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
          "X-RapidAPI-Key":
            "d9e03fdda1mshb3be7c734128a94p1339e8jsn02c1ef35f74d",
        },
      };

      // Make first two requests
      const [firstResponse, secondResponse] = await Promise.all([
        axios.request(options),
        axios.get(
          `${BASE_URL}/history`, {
        headers: { Authorization: `Bearer ${token}`}
        }),
      ]);

      // Update state once with all 2 responses
      this.setState({
        exerciseList: firstResponse.data,
        token: token,
        workoutHistory: secondResponse.data.history[0].workouts,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    
  }

  //handles search bar input change
  handleSearchInputChange = (text) => {
    this.setState({
      search: text,
    });
  };

  search = () => {
    const PATTERN = this.state.search;
    this.setState({
      searchResults: this.state.exerciseList.filter((exercise) =>
        exercise.name.includes(PATTERN)
      ),
    });

  }

  //handles workout selector
  selectWorkout = (id) => {
    const newExerciseToAdd = this.state.exerciseList.filter(
      (exercise) => exercise.id === id
    );
    const currentList = this.state.addedExercises;
    currentList.push(newExerciseToAdd[0]);
    this.setState({
      addedExercises: currentList,
      search: "",
      searchResults: [],
    });
  };

  // handles saving the full workout
  saveWorkout = (e) => {
    e.preventDefault();
    axios
      .post(
        `${BASE_URL}/history`,
        {
          exercises: this.state.addedExercises,
        },
        { headers: { Authorization: `Bearer ${this.state.token}` } }
      )
      .then((data) => {
        window.alert(data.data.message);
        window.location.replace("/myprofile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //handles set change
  handleRepChange = (id, set, e) => {
    //find id
    //add unique identifier to set
    let workingExercise = [...this.state.addedExercises].map((exercise) => {
      if (exercise.id === id) {
        if (!exercise.sets) {
          let newSet = [];
          newSet.push({ reps: e.target.value, setNumber: set });
          exercise.sets = newSet;
        } else {
          if (exercise.sets.find((sets) => sets.setNumber === set)) {
            exercise.sets[set - 1].reps = e.target.value;
          } else {
            exercise.sets.push({ reps: e.target.value, setNumber: set });
          }
        }
        return exercise;
      }
      return exercise;
    });

    this.setState({
      addedExercises: workingExercise,
    });
  };

  handleWeightChange = (id, set, e) => {
    //find id
    //add unique identifier to set
    let workingExercise = [...this.state.addedExercises].map((exercise) => {
      if (exercise.id === id) {
        if (!exercise.sets) {
          let newSet = [];
          newSet.push({ weight: e.target.value, setNumber: set });
          exercise.sets = newSet;
        } else {
          if (exercise.sets.find((sets) => sets.setNumber === set)) {
            exercise.sets[set - 1].weight = e.target.value;
          } else {
            exercise.sets.push({ weight: e.target.value, setNumber: set });
          }
        }
        return exercise;
      }
      return exercise;
    });

    this.setState({
      addedExercises: workingExercise,
    });
  };

  render() {
    // console.log(this.state.exerciseList)
    // console.log(this.state.token)
    // console.log(this.state.workoutHistory)

    if (!this.state.isLoggedIn) {
      return (
        <section className="myprofile">
          <h1>Log In To Start a New Workout</h1>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </section>
      );
    } else {

    return (
      <section className="workoutlog">
        <h1>Log New Workout</h1>
          <input
            type="search"
            placeholder="Search Exercise"
            value={this.state.search}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                this.search()
              }
            }
            }
            onChange={(e) => this.handleSearchInputChange(e.target.value)}
          ></input>
        {this.state.searchResults.map((exercise) => (
          <ExerciseSearchResults
            exercise={exercise}
            key={exercise.id}
            selectWorkout={this.selectWorkout}
          />
        ))}
        <p className="workoutlog_date">Date Started: {new Date().toLocaleString("en-US")}</p>
        <form
          id="workout"
          className="workoutlog_exercise-container"
          onSubmit={(e) => this.saveWorkout(e)}
        >
          {this.state.addedExercises.map((addedExercise) => (
            <AddedExercise
              addedExercise={addedExercise}
              key={addedExercise.id}
              handleRepChange={this.handleRepChange}
              handleWeightChange={this.handleWeightChange}
              workoutHistory={this.state.workoutHistory}
            />
          ))}
          <button type="submit" form="workout">
            Save Workout
          </button>
        </form>
      </section>
    );
  }}
}
