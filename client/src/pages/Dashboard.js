import axios from "axios";
import React, { Component } from "react";

export default class Dashboard extends Component {
  state = {
    workoutHistory: [],
  };

  componentDidMount() {
    console.log("dashboard mounted");
    axios
      .get("http://localhost:8080/history")
      .then((res) => {
        console.log(res);
        console.log(res.data[0].workouts);
        this.setState({
          workoutHistory: res.data[0].workouts,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentDidUpdate() {
    console.log("dashboard updated");
  }

  render() {
    if (this.state.workoutHistory.length === 0) {
      return <h1>No History</h1>;
    }
    return (
      <section>
        <h1>Dashboard</h1>
        {this.state.workoutHistory.map((workout) => (
          <table key={workout.id}>
            <thead>
              <tr>
                <th colSpan="3">Completed On: {workout.date}</th>
              </tr>
            </thead>
            {workout.exercises.map((exercise) => (
              <tbody key={exercise.exerciseId}>
                <tr>
                  <th colSpan="3">{exercise.exerciseName}</th>
                </tr>
                <tr>
                    <td>Set</td>
                    <td>Reps</td>
                    <td>Weight</td>
                </tr>
                  {exercise.sets.map((set) => (
                    <tr key={set.setNumber}>
                      <td>{`Set ${set.setNumber}`}</td>
                      <td>{set.reps}</td>
                      <td>{set.weight}</td>
                    </tr>
                  ))}
              </tbody>
            ))}
            ;
          </table>
        ))}
      </section>
    );
  }
}
