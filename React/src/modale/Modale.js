import React from "react";
const Modale = (props) => {

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

export default Modale;