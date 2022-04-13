import "./App.scss";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LogNewWorkout from "./pages/LogNewWorkout";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <h1>Hello World</h1>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/log-new-workout" component={LogNewWorkout} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
