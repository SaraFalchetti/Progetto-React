import React from "react";

const Filtro=(props)=>{

    return(
      <>
        <nav className="navbar navbar-light bg-light justify-content-between">
        <a className="navbar-brand">{props.title}</a>
          <form className="form-inline">
      {props.children}
      </form>
      </nav>
      </>
        )

};

export default Filtro;
