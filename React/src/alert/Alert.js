import React from "react";

const Alert=(props)=>{


    return(
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading"> {props.messaggio}</h4>
          
        </div>
    );

};

export default Alert;
