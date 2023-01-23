import { Route, Redirect, Switch } from 'react-router-dom';
import React, { useContext, Suspense } from 'react';
import Home from "./Home/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Login from './login/Login';
import MainHeader from "../src/mainHeader/MainHeader";
import AuthContext from './store/auth-context';
import Loading from './UI/Loading';
import { DettaglioContextProvider } from './store/dettaglio-context';
//import DettaglioContext from './store/dettaglio-context';


//import Dettaglio from '../src/pages/Dettaglio';

const Dettaglio = React.lazy(() => import('../src/pages/Dettaglio'))

function App() {
  const ctx = useContext(AuthContext);

  return (
    <div className="container-fluid mx-3 my-2 p-1">

      <MainHeader />

      <Suspense fallback={
        <div>
          <Loading />
        </div>
      }>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/tabella" />
          </Route>
          {!ctx.isLoggedIn && (
            <Route path="/login">
              <Login />
            </Route>)}


          <DettaglioContextProvider>
            
            <Route path="/tabella" exact>
              {ctx.isLoggedIn &&
                <Home />
              }
              {!ctx.isLoggedIn && <Redirect to="/login" />}
            </Route>
             <Route path="/tabella/dettaglio/:userId">
             {ctx.isLoggedIn && <Dettaglio />}
            {!ctx.isLoggedIn && <Redirect to="/login" />}
              </Route>
          </DettaglioContextProvider>

          <Route path="/dettaglio" exact>
            {ctx.isLoggedIn && <Dettaglio />}
            {!ctx.isLoggedIn && <Redirect to="/login" />}
          </Route>

       {/*    <Route path="/dettaglio/:userId">
            {ctx.isLoggedIn && <Dettaglio />}
            {!ctx.isLoggedIn && <Redirect to="/login" />}
          </Route> */}


          <Route path="*">
            <Redirect to="/tabella" />
          </Route>


        </Switch>
      </Suspense>

    </div>

  );
}

export default App;



