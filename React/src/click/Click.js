import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clickAction } from '../store/click-redux';
import Card from '../UI/Card';

const Click = () => {
    const [usernameState, setUsernameState]=useState("")
    const dispatch = useDispatch();

    const hideHandler = (event) => {
        event.preventDefault();
        dispatch(clickAction.hide());
    
    };

    const datiUsername=()=>{
        dispatch(clickAction.showDati(usernameState));
    };

    const usernameInput=(event)=>{
        setUsernameState(event.target.value);

    };


    return (
        <Card>
        <form onSubmit={hideHandler}>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input type="username" className="form-control" id="username" placeholder="Enter username"
              value={usernameState}
              onChange={usernameInput}
                />
            </div>
            {/* <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div> */}
            <button className="btn btn-outline-success mx-1" onClick={datiUsername}>Hide</button>
        </form>
        </Card>
    );
};

export default Click;
