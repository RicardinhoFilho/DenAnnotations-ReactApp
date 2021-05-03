import Login from "./Pages/Login";
import Repositories from "./Pages/Repositories";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/repositories">
          <Repositories />
        </Route>
       
      </Switch>
      </Router>
    </div>
  );
}

export default App;
