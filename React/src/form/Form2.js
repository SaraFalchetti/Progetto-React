import React, { useEffect, useRef } from "react";

const Form2 = (props) => {
    const { editedContatto } = props;

    const nameInputRef = useRef();
    const cognomeInputRef = useRef();
    const emailInputRef = useRef();
    const numeroInputRef = useRef();
    const indirizzoInputRef = useRef();

    useEffect(() => {

        if (editedContatto) {
            nameInputRef.current.value = editedContatto.nome;
            cognomeInputRef.current.value = editedContatto.cognome;
            emailInputRef.current.value = editedContatto.email;
            numeroInputRef.current.value = editedContatto.numero;
            indirizzoInputRef.current.value = editedContatto.indirizzo;
        }

    }, [editedContatto]);



    const submitHandler = (event) => {
        event.preventDefault();
        const enteredUserName = nameInputRef.current.value;
        const enteredUserCognome = cognomeInputRef.current.value;
        const enteredUserEmail = emailInputRef.current.value;
        const enteredUserNumero = numeroInputRef.current.value;
        const enteredUserIndirizzo = indirizzoInputRef.current.value;

        const formData = {

            id: (editedContatto && editedContatto.id) ?
                (editedContatto.id) : (Math.round(Math.random() * 100).toString()),
            nome: enteredUserName,
            cognome: enteredUserCognome,
            email: enteredUserEmail,
            numero: enteredUserNumero,
            indirizzo: enteredUserIndirizzo
        };

        props.onSaveFormData(formData);
        nameInputRef.current.value = "";
        cognomeInputRef.current.value = "";
        emailInputRef.current.value = "";
        numeroInputRef.current.value = "";
        indirizzoInputRef.current.value = "";

    };

    return (

        <form onSubmit={submitHandler}>
            <div className="row">
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <div className="form-group my-2">
                        <label>Nome</label>
                        <input type="text"
                            className="form-control my-1" id="exampleInputName" placeholder="Inserisci il nome"
                            ref={nameInputRef}
                        />
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <div className="form-group my-2">
                        <label >Cognome</label>
                        <input type="text"
                            className="form-control my-1" id="exampleInputCognome"
                            placeholder="Inserisci il Cognome"
                            ref={cognomeInputRef}
                        ></input>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <div className="form-group my-2" >
                        <label >Email</label>
                        <input type="email"
                            className="form-control my-1" id="exampleInputEmail1" aria-describedby="emailHelp"
                            placeholder="Inserisci la email"
                            ref={emailInputRef}
                        ></input>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3">
                    <div className="form-group my-2">
                        <label >Numero di telefono</label>
                        <input type="text"
                            className="form-control my-1" id="exampleInputNumero"
                            placeholder="Inserisci il numero di telefono"
                            ref={numeroInputRef}
                        ></input>
                    </div>
                </div>
            </div>

            <div className="col-sm-12 col-md-6 col-lg-3">
                <div className="form-group my-2">
                    <label>Indirizzo</label>
                    <input type="text"
                        className="form-control my-1" id="exampleInputName" placeholder="Inserisci l'indirizzo"
                        ref={indirizzoInputRef}
                    />
                </div>
            </div>

            <button type='submit'
                className="btn btn-outline-success mt-1">Invio</button>

        </form>

    );

}

export default Form2;