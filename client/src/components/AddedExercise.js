
import React, { Component } from "react";
import SetLog from "./SetLog";

export default class AddedExercise extends Component {
  state = {
    numberOfSets: [1],
  };

  increaseSetCounter = (e) => {
    e.preventDefault();
    const newArray = this.state.numberOfSets;
    console.log(newArray.length);
    newArray.push(newArray.length + 1);
    this.setState({
      numberOfSets: newArray,
    });
  };

  decreaseSetCounter = (e) => {
    e.preventDefault();
    const newArray = this.state.numberOfSets;
    console.log(newArray.length);
    newArray.pop();
    this.setState({
      numberOfSets: newArray,
    });
  }

  componentDidMount() {
    console.log("set log mounted");
  }

  componentDidUpdate() {
    console.log("set log updated");
  }

  render() {
    console.log(this.state.numberOfSets);
    console.log(this.props);
    const { addedExercise, handleRepChange, handleWeightChange } = this.props;
    return (
      <div className="workoutlog_exercise">
        <input type="hidden" id="exerciseId" value={addedExercise.id}></input>
        <h3>{addedExercise.name}</h3>
        {/* <p>Previous Date:</p>
        <p>3x10lb</p> */}
          <div className="workoutlog_exercise-headers">
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
