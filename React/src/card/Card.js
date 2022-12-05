import React from "react";

const Card = (props) => {
  return (
    <div className="row">
      <div className='col-sm-6'>
        <div className="card">
        <div className="card-body">
          {props.children}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Card;