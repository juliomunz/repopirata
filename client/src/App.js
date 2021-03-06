import 'bootstrap/dist/css/bootstrap.min.css'
import './App.scss';
import {
  BrowserRouter as Router,
  Switch,
  Route,} from "react-router-dom";

import Login from './views/Login';
import Pirates from './views/Pirates';
import CreatePirate from './views/CreatePirate';
import ViewPirate from './views/ViewPirate';


function App() {
  return (
    <div className="container">
      <Router>
          <Switch>
          <Route exact path="/pirates/:id">
              <ViewPirate/>
          </Route>
          <Route exact path="/pirate/new">
            <CreatePirate/>
          </Route>
          <Route exact path="/pirates">
              <Pirates/>
          </Route>
            <Route exact path="/">
                <Login/>
            </Route>
          </Switch>
      </Router>
    </div>

  );
}

export default App;
