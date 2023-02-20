import React, { useContext } from 'react';
import AuthContext from '../store/auth-context';
import "../mainHeader/Navigation.css";
import { useSelector, useDispatch } from 'react-redux';
import { clickAction } from '../store/click-redux';
import { authAction } from '../store/auth-redux';

const Navigation = () => {
  //const ctx = useContext(AuthContext);

  //const username= useSelector(state => state.click.username);

  const isClicked = useSelector(state => state.click.isClicked);
  const isLogged= useSelector(state => state.auth.isLogged);

  const dispatch = useDispatch();

  const logoutHandler=()=>{
    dispatch(authAction.logout())
  }

  const showHandler = () => {
    dispatch(clickAction.show());
  }

  return (

    <nav className="navbar navbar-expand-lg navbar-light bg-light">

      <a className="navbar-brand" href="#"><h1>I tuoi contatti</h1></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon">Contatti</span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">

          {isLogged && (
            <li>
              <button className="btn btn-outline-success mx-1" type="button"
                onClick={logoutHandler}>Logout</button>
            </li>
          )}

          {isClicked && <li>
            <button className="btn btn-outline-success mx-1" type="button" 
            onClick={showHandler}>Show</button>
          </li>
          }

        </ul>
      </div>

    </nav>

    //////////
    /*
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
          <a class="navbar-brand" href="#">Hidden brand</a>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            {ctx.isLoggedIn && (
              <li>
                <button onClick={ctx.onLogout}>Logout</button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>*/
    ////////////

    /*  <nav className={classes.nav}>
       <ul>
         {ctx.isLoggedIn && (
           <li>
             <a href="/">Users</a>
           </li>
         )}
         {ctx.isLoggedIn && (
           <li>
             <button onClick={ctx.onLogout}>Logout</button>
           </li>
         )}
       </ul>
     </nav> */
  );
};

export default Navigation;
