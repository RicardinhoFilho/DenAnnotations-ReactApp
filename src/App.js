import Login from "./Pages/Login";
import Repositories from "./Pages/Repositories";
import Notes from "./Pages/Notes";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/repositories">
          <Repositories />
        </Route>
        <Route  path="/notes/:id">
          <Notes />
        </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
