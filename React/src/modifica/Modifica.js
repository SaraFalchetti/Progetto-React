
import {useState} from "react";

function Modifica({ contattoModificato, updateContatto }) {

    const [updatedNome, setUpdateNome] = useState(contattoModificato.nome)
    const [updatedCognome, setUpdateCognome] = useState(contattoModificato.cognome);
    const [updatedEmail, setUpdateEmail] = useState(contattoModificato.email);
    const [updatedNumero, setUpdateNumero] = useState(contattoModificato.numero);
    const [updatedIndirizzo, setUpdateIndirizzo] = useState(contattoModificato.indirizzo);

    const nomeChangeHandler = (event) => {
        setUpdateNome(event.target.value);  
    };
    const cognomeChangeHandler = (event) => {
        setUpdateCognome(event.target.value);
    };
    const emailChangeHandler = (event) => {
        setUpdateEmail(event.target.value);
    };
    const numeroChangeHandler = (event) => {
        setUpdateNumero(event.target.value);
    };
    const indirizzoChangeHandler = (event) => {
        setUpdateIndirizzo(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        
         updateContatto({...contattoModificato, 
            nome:updatedNome,
            cognome:updatedCognome, 
            email:updatedEmail, 
            numero:updatedNumero,
            indirizzo:updatedIndirizzo});
        
    }; 

    return (
        <div>

            <form onSubmit={submitHandler}>
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <div className="form-group my-2">
                            <label>Nome</label>
                            <input type="text"
                                className="form-control my-1" id="exampleInputName" placeholder="Modifica nome"
                                value={updatedNome}
                                onChange={nomeChangeHandler} />
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <div className="form-group my-2">
                            <label>Cognome</label>
                            <input type="text"
                                className="form-control my-1" id="exampleInputCognome"
                                placeholder="Modifica Cognome"
                                value={updatedCognome}
                                onChange={cognomeChangeHandler}></input>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <div className="form-group my-2">
                            <label>Email</label>
                            <input type="email"
                                className="form-control my-1" id="exampleInputEmail1" aria-describedby="emailHelp"
                                placeholder="Modifica email"
                                value={updatedEmail}
                                onChange={emailChangeHandler}></input>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3">
                        <div className="form-group my-2">
                            <label>Numero di telefono</label>
                            <input type="text"
                                className="form-control my-1" id="exampleInputNumero"
                                placeholder="Modifica numero di telefono"
                                value={updatedNumero}
                                onChange={numeroChangeHandler}></input>
                        </div>
                    </div>
                </div>

                <div className="col-sm-12 col-md-6 col-lg-3">
                    <div className="form-group my-2">
                        <label>Indirizzo</label>
                        <input type="text"
                            className="form-control my-1" id="exampleInputName" placeholder="Modifica l'indirizzo"
                            value={updatedIndirizzo}
                            onChange={indirizzoChangeHandler} />
                    </div>
                </div>

                <button type='submit'
                    className="btn btn-outline-success mt-1">Invio</button>

            </form>
        </div>
    );

};


export default Modifica;