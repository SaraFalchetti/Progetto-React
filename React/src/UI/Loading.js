import React from "react";

const Loading=(props)=>{
    return(
    <div class="d-flex align-items-center">
    <strong>Loading...</strong>
    <div class="spinner-border text-success ms-auto" role="status" aria-hidden="true"></div>
  </div>
)
}

export default Loading;