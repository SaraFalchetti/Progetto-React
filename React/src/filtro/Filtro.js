import React from "react";

const Filtro = (props) => {

  return (
    <>
      <nav className="navbar navbar-light bg-transparent justify-content-between">
        <a className="navbar-brand"><h3>{props.title}</h3></a>
        <form className="form-inline">
          {props.children}
        </form>
      </nav>
    </>
  )

};

export default Filtro;
