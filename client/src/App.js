import "./App.scss";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LogNewWorkout from "./pages/LogNewWorkout";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/myprofile" component={Dashboard} />
          <Route path="/log-new-workout" component={LogNewWorkout} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
