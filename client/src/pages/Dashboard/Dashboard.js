import axios from "axios";
import React, { Component } from "react";
import "../Dashboard/Dashboard.scss";

export default class Dashboard extends Component {
  state = {
    workoutHistory: [],
    isLoading: true,
    userInfo: {},
  };

  componentDidMount() {
    console.log("dashboard mounted");
    const token = sessionStorage.getItem("token");
    console.log(token);
    axios
      .get("http://localhost:8080/history", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        console.log(res.data.history[0].workouts);
        this.setState({
          isLoading: false,
          workoutHistory: res.data.history[0].workouts,
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
    console.log(` isLoading: ${this.state.isLoading}`);
    if (this.state.workoutHistory.length === 0) {
      return <h1>No History</h1>;
    }
    return (
      <section className="myprofile">
        <h1>My Profile</h1>
        <div className="myprofile_workout-container">
          {this.state.workoutHistory.map((workout) => (
            <table key={workout.id} className="myprofile_workout">
              <thead>
                <tr>
                  <th colSpan="3">Completed On: {workout.date}</th>
                </tr>
              </thead>
              {workout.exercises.map((exercise) => (
                <tbody key={exercise.id} className="myprofile_exercise">
                  <tr>
                    <th colSpan="3">{exercise.name}</th>
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
              
            </table>
          ))}
        </div>
      </section>
    );
  }
}