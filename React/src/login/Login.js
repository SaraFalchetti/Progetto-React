import React, { useState, useEffect, useReducer, useContext } from 'react';
import Card from '../UI/Card';
import classes from './Login.module.css';
import AuthContext from "../store/auth-context";

const usernameReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 }
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 }
  }
  return { value: '', isValid: false }

}

const Login = () => {

  const [formIsValid, setFormIsValid] = useState(false);

  const [usernameState, dispatchUsername] = useReducer(usernameReducer,
    { value: '', isValid: null });

  const { isValid: usernameIsValid } = usernameState;

  //quando il value cambia ma la validity non cambia questo effect non re-run

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(
        usernameIsValid
      );
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [usernameIsValid]);

  const authCtx = useContext(AuthContext)

  const UserChangeHandler = (event) => {
    dispatchUsername({ type: "USER_INPUT", val: event.target.value })
  };


  const validateUserHandler = () => {
    dispatchUsername({ type: "INPUT_BLUR" });
  };


  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogIn(usernameState.value);
    }

  };

  return (

    <div className='row'>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">

            <Card className={classes.login}>

              <form onSubmit={submitHandler}>
                <div
                  className={`${classes.control} ${usernameIsValid === false ? classes.invalid : ''
                    }`}
                >
                  <label htmlFor="username">Username</label>
                  <input
                    type="username"
                    id="username"
                    value={usernameState.value}
                    onChange={UserChangeHandler}
                    onBlur={validateUserHandler}
                  />
                </div>

                <div className={classes.actions}>
                  <button className="btn btn-outline-success mx-1" type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
