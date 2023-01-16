import { Route, Redirect, Switch } from 'react-router-dom';
import React, { useContext } from 'react';
import Home from "./Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Dettaglio from '../src/pages/Dettaglio';
import Login from './login/Login';
import MainHeader from "../src/mainHeader/MainHeader";
import AuthContext from './store/auth-context';

function App() {
  const ctx = useContext(AuthContext);

  return (
    <div className="container-fluid mx-3 my-2 p-1">

      <MainHeader />

      <Switch>
        <Route path="/" exact>
          <Redirect to="/tabella" />
        </Route>

        {!ctx.isLoggedIn && (
          <Route path="/login">
            <Login></Login>
          </Route>)}

        <Route path="/tabella">
          {ctx.isLoggedIn && <Home />}
          {!ctx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/dettaglio" exact>
          {ctx.isLoggedIn && <Dettaglio />}
          {!ctx.isLoggedIn && <Redirect to="/login" />}
        </Route>

        <Route path="/dettaglio/:userId">
          {ctx.isLoggedIn && <Dettaglio />}
          {!ctx.isLoggedIn && <Redirect to="/login" />}
        </Route>


        <Route path="*">
          <Redirect to="/tabella" />
        </Route>


      </Switch>

    </div>

  );
}

export default App;



