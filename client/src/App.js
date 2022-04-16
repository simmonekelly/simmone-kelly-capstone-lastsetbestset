import "./App.scss";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LogNewWorkout from "./pages/LogNewWorkout";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login">
            <Login isSignedUp="true" />
          </Route>
          <Route path="/signup" component={Login} />
          <Route path="/myprofile" component={Dashboard} />
          <Route path="/log-new-workout" component={LogNewWorkout} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
