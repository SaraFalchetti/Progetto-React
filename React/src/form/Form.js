import React, { useEffect, useState } from "react";

const Form = (props) => {
    const {editedContatto}= props;
    const [enteredNome, setEnteredNome] = useState('');
    const [enteredCognome, setEnteredCognome] = useState('');
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredNumero, setEnteredNumero] = useState('');
    const [enteredIndirizzo, setEnteredIndirizzo] = useState('');


    useEffect(() => {
       
        if(editedContatto){
            setEnteredNome(editedContatto.nome);
            setEnteredCognome(editedContatto.cognome);
            setEnteredEmail(editedContatto.email);
            setEnteredNumero(editedContatto.numero);
            setEnteredIndirizzo(editedContatto.indirizzo)
        }
        
    }, [editedContatto]);
  

    const nomeChangeHandler = (event) => {
        setEnteredNome(event.target.value);
    };
    const cognomeChangeHandler = (event) => {
        setEnteredCognome(event.target.value);
    };
    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    };
    const numeroChangeHandler = (event) => {
        setEnteredNumero(event.target.value);
    };
    const indirizzoChangeHandler = (event) => {
        setEnteredIndirizzo(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const formData = {
            
            id:(editedContatto && editedContatto.id ) ? 
            (editedContatto.id):( Math.round(Math.random() * 100).toString()),
            nome: enteredNome,
            cognome: enteredCognome,
            email: enteredEmail,
            numero: enteredNumero,
            indirizzo: enteredIndirizzo
        };

        props.onSaveFormData(formData);
        setEnteredNome('');
        setEnteredCognome('');
        setEnteredEmail('');
        setEnteredNumero('');
        setEnteredIndirizzo('');



    };

    return (

        <form onSubmit={submitHandler}>
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <div className="form-group my-2">
                        <label>Nome</label>
                        <input type="text"
                            className="form-control my-1" id="exampleInputName" placeholder="Inserisci il nome"
                            value={enteredNome}
                            onChange={nomeChangeHandler}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <div className="form-group my-2">
                        <label >Cognome</label>
                        <input type="text"
                            className="form-control my-1" id="exampleInputCognome"
                            placeholder="Inserisci il Cognome"
                            value={enteredCognome}
                            onChange={cognomeChangeHandler}></input>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <div className="form-group my-2" >
                        <label >Email</label>
                        <input type="email"
                            className="form-control my-1" id="exampleInputEmail1" aria-describedby="emailHelp"
                            placeholder="Inserisci la email"
                            value={enteredEmail}
                            onChange={emailChangeHandler}></input>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <div className="form-group my-2">
                        <label >Numero di telefono</label>
                        <input type="text"
                            className="form-control my-1" id="exampleInputNumero"
                            placeholder="Inserisci il numero di telefono"
                            value={enteredNumero}
                            onChange={numeroChangeHandler}></input>
                    </div>
                </div>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-3">
                <div className="form-group my-2">
                    <label>Indirizzo</label>
                    <input type="text"
                        className="form-control my-1" id="exampleInputName" placeholder="Inserisci l'indirizzo"
                        value={enteredIndirizzo}
                        onChange={indirizzoChangeHandler}
                    />
                </div>
            </div>

            <button type='submit'
                className="btn btn-outline-success mt-1" >Invio</button>

        </form>

    );

}

export default Form;