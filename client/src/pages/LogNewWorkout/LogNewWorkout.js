import React, { Component } from "react";
import axios from "axios";
import ExerciseList from "../../components/ExerciseList";
import ExerciseSearchResults from "../../components/ExerciseSearchResults";
import AddedExercise from "../../components/AddedExercise";
import './LogNewWorkout.scss'

const BASE_URL = "https://wger.de/api/v2";

export default class LogNewWorkout extends Component {
  state = {
    exerciseList: [],
    search: "",
    searchResults: [],
    addedExercises: [],
  };

  componentDidMount() {
    console.log("log new workout mounted")
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
        this.setState({
          exerciseList: res.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log("updated");
    //condition to check previous state to stop infinite loop for search results
    if (!this.state.search) {
      //console.log("no search");
      return;
    } else {
      if (this.state.search === prevState.search) {
        //console.log("matches");
      } else {
        //console.log("running search");
        const PATTERN = this.state.search;
        this.setState({
          searchResults: this.state.exerciseList.filter(exercise => exercise.name.includes(PATTERN))
        })
      }
    }
  }

  //handles search bar input change
  handleSearchInputChange = (text) => {
    //console.log(text);
    this.setState({
      search: text,
    });
  };

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
    console.log("saved workout");
    axios.post('http://localhost:8080/history', {
      exercises: this.state.addedExercises
    }).then(data => {
      window.alert(data.data.message)
      window.location.replace("/myprofile");
    }).catch(err => {
      console.log(err)
    })
  };

  //handles set change 
  //set state to capture the value changes
  //pass state to server
  handleRepChange = (id, set, e) => {

    //find id
    //add unique identifier to set
    let workingExercise2 = [...this.state.addedExercises].map((exercise) => {
      console.log(exercise)
      if(exercise.id === id) {
        if(!exercise.sets){
          let newSet = []
          newSet.push({reps:e.target.value, setNumber:set})
          exercise.sets = newSet
        } else {
          if(exercise.sets.find(sets => sets.setNumber === set)) {
            console.log('found set')
            exercise.sets[set -1].reps = e.target.value
          } else {
            exercise.sets.push({reps:e.target.value, setNumber:set})
          }
        }
        return exercise
      }
      return exercise
    }
    );
    
    this.setState({
      addedExercises: workingExercise2
    })
  }

  handleWeightChange = (id, set, e) => {

    //find id
    //add unique identifier to set
    let workingExercise2 = [...this.state.addedExercises].map((exercise) => {
      if(exercise.id === id) {
        if(!exercise.sets){
          let newSet = []
          newSet.push({weight:e.target.value, setNumber:set})
          exercise.sets = newSet
        } else {
          if(exercise.sets.find(sets => sets.setNumber === set)) {
            console.log('found set')
            exercise.sets[set -1].weight = e.target.value
          } else {
            exercise.sets.push({weight:e.target.value, setNumber:set})
          }
        }
        return exercise
      }
      return exercise
    }
    );
  
    this.setState({
      addedExercises: workingExercise2
    })
   
  }


  render() {
    return !this.state.exerciseList ? null : (
      <section className="workoutlog">
        <h1>Log New Workout</h1>
        <form className="workoutlog_exercise-search">
          <input
            type="text"
            placeholder="Search Exercise"
            value={this.state.search}
            onChange={(e) => this.handleSearchInputChange(e.target.value)}
          ></input>
        </form>
        {this.state.searchResults.map((exercise) => (
          <ExerciseSearchResults
            exercise={exercise}
            key={exercise.id}
            selectWorkout={this.selectWorkout}
          />
        ))}
        <h3>Added Exercises</h3>
        <p>Date Completed: {new Date().toLocaleString()}</p>
        <form id="workout" className="workoutlog_exercise-container" onSubmit={(e) => this.saveWorkout(e)}>
          {this.state.addedExercises.map((addedExercise) => (
            <AddedExercise
              addedExercise={addedExercise}
              key={addedExercise.id}
              handleRepChange={this.handleRepChange}
              handleWeightChange={this.handleWeightChange}
            />
          ))}
          <button
            type="submit"
            form="workout"
          >
            Save Workout
          </button>
        </form>
      </section>
    );
  }
}
