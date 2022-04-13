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
  componentDidMount() {
    console.log("set log mounted");
  }

  componentDidUpdate() {
    console.log("set log updated");
  }

  render() {
    console.log(this.state.numberOfSets);
    console.log(this.props);
    const { addedExercise } = this.props;
    return (
      <div>
        <h3>{addedExercise.name}</h3>
        <p>Previous Date:</p>
        <p>3x10lb</p>
        <form>
          <table>
            <tr>
              <th>Set</th>
              <th>Reps</th>
              <th>Weight</th>
              <th>+/- Sets</th>
            </tr>
            {this.state.numberOfSets.map((number, index) => (
              <SetLog
                setNumber={number}
                key={"set" + index}
                increaseSetCounter={this.increaseSetCounter}
              />
            ))}
          </table>
        </form>
      </div>
    );
  }
}
