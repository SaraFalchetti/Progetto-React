import React from "react";
import ReactDOM from 'react-dom';


const Modale2 = (props) => {

    const closeModal = () => {
        props.closeModal()
    }

    return (

        <div className="modal fade" id={props.id}
            aria-labelledby={`${props.id}Label`}
            aria-hidden="true">

            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="ModalLabel">
                            {props.title}
                        </h5>

                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            onClick={closeModal}
                        ></button>
                    </div>
                    <div className="row">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
           
            );
    
}

{ReactDOM.createPortal(<Modale2></Modale2>, document.getElementById("modal-root"))}

export default Modale2;