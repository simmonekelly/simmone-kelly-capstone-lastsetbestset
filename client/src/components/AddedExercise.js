
import React, { Component } from "react";
import SetLog from "./SetLog";

export default class AddedExercise extends Component {
  state = {
    numberOfSets: [1],
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
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    const { addedExercise, handleRepChange, handleWeightChange } = this.props;
    return (
      <div className="workoutlog_exercise">
        <div className="workoutlog_exercise-headers">
        <img src={addedExercise.gifUrl} />
        <h3>{addedExercise.name}</h3>
        </div>
        {/* <p>Previous Date:</p>
        <p>3x10lb</p> */}
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
