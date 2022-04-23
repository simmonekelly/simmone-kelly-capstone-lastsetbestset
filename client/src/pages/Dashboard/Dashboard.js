import axios from "axios";
import React, { Component } from "react";
import "../Dashboard/Dashboard.scss";
import { Link } from "react-router-dom"

export default class Dashboard extends Component {
  state = {
    workoutHistory: [],
    isLoading: true,
    userInfo: {},
    isLoggedIn: true,
  };

  componentDidMount() {
    console.log("dashboard mounted");
    const token = sessionStorage.getItem("token");
    console.log(`token: ${token}`)

    if (!token) {
      this.setState({
        isLoggedIn: false,
      });
    } else {
      axios
        .get("http://localhost:8080/history", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          this.setState({
            isLoading: false,
            workoutHistory: res.data.history[0].workouts,
          });
        })
        .catch((err) => {
          //fix error where server crashes
          console.log(err);
        });
    }
  }

  componentDidUpdate() {
    console.log("dashboard updated");
  }

  render() {
    console.log(this.state.isLoggedIn)
    if (!this.state.isLoggedIn) {
      return (
        <section className="myprofile">
          <h1>Please Log In To See Workout History</h1>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </section>
      );
    } else {
      if (this.state.workoutHistory.length === 0) {
        return (
          <section className="myprofile">
          <h1>No History</h1>
          <p>Complete your first work out and it will display here.</p>
          </section>
        )
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
}
