import Alert from "../alert/Alert";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import '../form/Form.css';


let initialValues = {
    nome: "",
    cognome: "",
    email: "",
    numero: "",
    indirizzo: ""
};

const FormFormik = (props) => {
    const { editedContatto } = props;
    const [show, setShow] = useState(true);
    const [valoreIniziale, setValoreIniziale] = useState(initialValues)



    const onSubmit = (values, onSubmitProps) => {
        //controlli per vedere firma 
        console.log("Form Data", values)
        console.log("Submit props", onSubmitProps)

        const enteredUserName = values.nome;
        const enteredUserCognome = values.cognome;
        const enteredUserEmail = values.email;
        const enteredUserNumero = values.numero;
        const enteredUserIndirizzo = values.indirizzo;

        const formData = {
            nome: enteredUserName,
            cognome: enteredUserCognome,
            email: enteredUserEmail,
            numero: enteredUserNumero,
            indirizzo: enteredUserIndirizzo
        };

        props.onSaveFormData(formData);

        onSubmitProps.resetForm();
    };
    /*
        const validate= values => {
            let errors = {};
    
            //se i valori sono vuoti
            if (!values.nome) {
                errors.nome = 'Required'
            }else if(!/^[a-zA-Z]{1,20}$/i.text(values.nome)){
                errors.nome= "Inserisci massimo 20 caratteri"
            };
    
            if (!values.cognome) {
                errors.cognome = 'Required'
            }else if(!/^[a-zA-Z]{1,20}$/i.text(values.cognome)){
                errors.cognome= "Inserisci massimo 20 caratteri"
            };
    
            if (!values.email) {
                errors.email = 'Required'
            }else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"/i.text(values.email)){
                errors.email= "Rispetta il formato Example@email.it"
            };
    
            if (!values.numero) {
                errors.numero = 'Required'
            }
            if (!values.indirizzo) {
                errors.indirizzo = 'Required'
            }else if(!/^[a-zA-Z]{1,20}$/i.text(values.indirizzo)){
                errors.indirizzo= "Inserisci massimo 20 caratteri"
            };
            return errors
        }; */

    const validationSchema = Yup.object({
        nome: Yup.string().matches(/^[a-zA-Z]{1,15}$/, "Inserisci massimo 15 caratteri").required('Required'),
        cognome: Yup.string().matches(/^[a-zA-Z]{1,15}$/, "Inserisci massimo 15 caratteri").required('Required'),
        email: Yup.string().email('Formato email non valido').required('Required'),
        numero: Yup.string().required('Required'),
        indirizzo: Yup.string().required('Required')
    })

    const showModal = () => {

        setShow((s) => !s);

    };


    /*  const formik = useFormik({
         initialValues,
         onSubmit,
         //validate questo lo commento perchè ho usato yup 
         validationSchema
         
     }); 
  */


    useEffect(() => {

        if (editedContatto) {

            let editedvalues = {
                nome: editedContatto.nome,
                cognome: editedContatto.cognome,
                email: editedContatto.email,
                numero: editedContatto.numero,
                indirizzo: editedContatto.indirizzo
            }
            setValoreIniziale(editedvalues)

        }
    }, [editedContatto]);


    return (

        <><div className='row'>
            <div className='col-12 mt-1 mx-3 p-1'><h1>Inserisci/modifica un contatto</h1></div>
        </div>
            <div className='row'>
                <Formik
                    initialValues={valoreIniziale}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    enableReinitialize={true}>
                   
                    <Form>
                        <div className="row">
                            
                            <div className="col-sm-12 col-md-6 col-lg-3">
                                <div className="form-group my-2">
                                    <label>Nome</label>
                                    <Field name="nome">
                                        {
                                            (props) => {
                                                const { field, form, meta } = props
                                                return (<div>
                                                    <input type="text"
                                                        className="form-control my-1" id="nome" name="nome" placeholder="Inserisci il nome"  {...field} />
                                                    {meta.touched && meta.error ?
                                                        <div className="error">{meta.error}</div> : null}
                                                </div>)
                                            }
                                        }
                                    </Field>

                                    {/*  <ErrorMessage name="nome">
                                                {(errorMsg) =>
                                                    <div className="error">{errorMsg}</div>}
                                            </ErrorMessage>*/}
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-3">
                                <div className="form-group my-2">
                                    <label>Cognome</label>
                                    <Field name="cognome"
                                    >
                                        {
                                            (props) => {
                                                const { field, form, meta } = props
                                                return (<div>
                                                    <input type="text"
                                                        className="form-control my-1" id="cognome" name="cognome"
                                                        placeholder="Inserisci il Cognome" {...field} />
                                                    {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
                                                </div>)
                                            }
                                        }
                                    </Field>

                                    {/*  <ErrorMessage name="cognome"> {(errorMsg) =>
                                                <div className="error">{errorMsg}</div>}
                                            </ErrorMessage> */}
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-3">
                                <div className="form-group my-2">
                                    <label>Email</label>
                                    <Field name="email">
                                        {
                                            (props) => {
                                                const { field, form, meta } = props
                                                return (<div>
                                                    <input type="email"
                                                        className="form-control my-1" id="email" aria-describedby="emailHelp"
                                                        placeholder="Inserisci la email" {...field} />
                                                    {meta.touched && meta.error ?
                                                        <div className="error">{meta.error}</div> : null}
                                                </div>)
                                            }
                                        }
                                    </Field>

                                    {/*   <ErrorMessage name="email"> {(errorMsg) =>
                                                <div className="error">{errorMsg}</div>}
                                            </ErrorMessage> */}
                                </div>
                            </div>
                            <div className="col-sm-12 col-md-6 col-lg-3">
                                <div className="form-group my-2">
                                    <label>Numero di telefono</label>
                                    <Field name="numero">
                                        {
                                            (props) => {
                                                const { field, form, meta } = props
                                                return (<div>
                                                    <input type="text"
                                                        className="form-control my-1" id="numero"
                                                        placeholder="Inserisci il numero di telefono" {...field} />
                                                    {meta.touched && meta.error ?
                                                        <div className="error">{meta.error}</div> : null}
                                                </div>)
                                            }
                                        }</Field>
                                    {/* 
                                            <ErrorMessage name="numero"> {(errorMsg) =>
                                                <div className="error">{errorMsg}</div>}
                                            </ErrorMessage> */}
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12 col-md-6 col-lg-3">
                            <div className="form-group my-2">
                                <label>Indirizzo</label>
                                <Field name="indirizzo"
                                >
                                    {
                                        (props) => {
                                            const { field, form, meta } = props
                                            return (<div>
                                                <input type="text"
                                                    className="form-control my-1" id="indirizzo" placeholder="Inserisci l'indirizzo" {...field} />
                                                {meta.touched && meta.error ?
                                                    <div className="error">{meta.error}</div> : null}
                                            </div>)
                                        }
                                    }

                                </Field>
                                {/*     <ErrorMessage name="indirizzo"> {(errorMsg) =>
                                            <div className="error">{errorMsg}</div>}
                                        </ErrorMessage> */}
                            </div>
                        </div>

                        <button type='submit'
                            className="btn btn-outline-success mt-1" onClick={showModal}
                        //disabled={!formik.isValid}
                        //disabled={formik.isSubmitting}
                        //disabled={!formik.isValid}
                        > Invio</button>

                    </Form>


                </Formik>
            </div>
            {!show && <Alert messaggio="Utente aggiunto con successo"></Alert>}
        </>


    );

}

export default FormFormik;