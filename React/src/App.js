import { Route, Redirect, Switch } from 'react-router-dom';
import Home from "./Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Dettaglio from '../src/pages/Dettaglio'


function App() {

  return (
    <div className="container-fluid mx-3 my-2 p-1">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/tabella" />
        </Route>
        <Route path="/tabella">
          <Home></Home>
        </Route>
        <Route path="/dettaglio/:userId">
          <Dettaglio />
        </Route>
        <Route path="*">
          <Redirect to="/tabella" />
        </Route>
      </Switch>

    </div>

  );
}

export default App;
