import axios from "axios";
import React, { Component } from "react";
import SetLog from "./SetLog";

export default class AddedExercise extends Component {
  state = {
    numberOfSets: [1],
    lastSet: [],
    lastSetDate: "",
  };

  increaseSetCounter = (e) => {
    e.preventDefault();
    const newArray = this.state.numberOfSets;
    newArray.push(newArray.length + 1);
    this.setState({
      numberOfSets: newArray,
    });
  };

  decreaseSetCounter = (e) => {
    e.preventDefault();
    const newArray = this.state.numberOfSets;
    newArray.pop();
    this.setState({
      numberOfSets: newArray,
    });
  };

  componentDidMount() {
    const history = this.props.workoutHistory;
    const filteredWorkouts = history.filter((workouts) => {
      const arr = workouts.exercises.filter(
        (exercises) => exercises.id === this.props.addedExercise.id
      );
      if (arr.length > 0) return arr;
    });

    const lastCompleted = filteredWorkouts[0].exercises.find(
      (exercise) => exercise.id === this.props.addedExercise.id
    );
    this.setState({
      lastSet: lastCompleted.sets[lastCompleted.sets.length - 1],
      lastSetDate: filteredWorkouts[0].date,
    });
  }

  componentDidUpdate() {}

  render() {
    const { addedExercise, handleRepChange, handleWeightChange } = this.props;
    return (
      <div className="workoutlog_exercise">
        <div className="workoutlog_exercise-headers-container">
          <img src={addedExercise.gifUrl} />
          <div className="workoutlog_exercise-headers">
            <p className="workoutlog_exercise-name">{addedExercise.name}</p>
            <p>{`${this.state.lastSetDate}: ${this.state.lastSet.reps}x${this.state.lastSet.weight}lbs`}</p>
          </div>
        </div>
        <div className="workoutlog_exercise-rep-headers">
          <p>Sets</p>
          <p>Reps</p>
          <p>Weight</p>
          <p>+/- Sets</p>
        </div>
        {this.state.numberOfSets.map((number, index) => (
          <SetLog
            setNumber={number}
            key={"set" + index}
            increaseSetCounter={this.increaseSetCounter}
            decreaseSetCounter={this.decreaseSetCounter}
            handleRepChange={handleRepChange}
            handleWeightChange={handleWeightChange}
            exerciseid={addedExercise.id}
          />
        ))}
      </div>
    );
  }
}
