import Login from "./Pages/Login";
import Repositories from "./Pages/Repositories";
import Notes from "./Pages/Notes";
import SingUp from "./Pages/SingUp";
import  UpdateAccount from "./Pages/updateAccount";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/singup">
          <SingUp />
        </Route>
        <Route exact path="/updateAccount">
          <UpdateAccount />
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
