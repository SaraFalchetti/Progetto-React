import React from "react";

const Card = (props) => {
  return (
        <div className="card">
        <div className="card-body">
        <h5 className="card-title">{props.titleId} {props.titleNome} 
        {props.titleCognome}</h5>       
          {props.children}
        </div>
      </div>
    
  );
};

export default Card;