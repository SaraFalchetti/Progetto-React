import React, { useState } from 'react';
import TabellaDati from '../tabella-dati/TabellaDati';
import Form from '../form/Form';
import Modale from '../modale/Modale';


const dati_statici = [
  {
    id: 1,
    nome: 'Nome 1',
    cognome: 'Cognome 1',
    email: 'Email@1',
    numero: 'Telefono 1',
    indirizzo: 'Indirizzo 1'
  },

  {
    id: 2,
    nome: 'Nome 2',
    cognome: 'Cognome 2',
    email: 'Email@2',
    numero: 'Telefono 2',
    indirizzo: 'Indirizzo 2'
  },

  {
    id: 3,
    nome: 'Nome 3',
    cognome: 'Cognome 3',
    email: 'Email@3',
    numero: 'Telefono 3',
    indirizzo: 'Indirizzo 3'
  },

  {
    id: 4,
    nome: 'Nome 4',
    cognome: 'Cognome 4',
    email: 'Email@4',
    numero: 'Telefono 4',
    indirizzo: 'Indirizzo 4'
  },
];

const Home = () => {

  const [dati, setDati] = useState(dati_statici);
  const [indirizzo, setIndirizzo] = useState(null);

  const [editedContatto, setEditedContatto] = useState(null);
  const [id,setId]=useState(null)


  const modificaHandler = (contatto) => {
    setEditedContatto(contatto);

  };

  const saveFormDataHandler = (data) => {

    const index = dati.findIndex((elemento) => elemento.id === data.id)

    if (index !== -1) {
      let contatti = [...dati];
      contatti[index] = data;
      setDati(contatti)
    } else {
      setDati((prevContatti) => {
        return [data, ...prevContatti]
      })
    }
    setEditedContatto(null);
  };

  const saveIndirizzoHandler = (address) => {
    setIndirizzo(address);

  };

  const settaIndirizzo = () => {
    setIndirizzo(null);
  };

  const deleteHandler = () => {

    setDati((prevState) => prevState.filter(cont => cont.id !== id));
    
  };

const prendiId=(id)=>{
  setId(id)
}


  return (
    <>
      <div className='row'>
        <div className='col-12 mt-2 mx-3 p-1 '><h1>Rubrica</h1></div>
      </div>
      <div className='row'>
        <div className='col-sm-12 col-md-10 col-lg-8'>
          <TabellaDati contatti={dati}
            onDelete={prendiId}
            onChange={modificaHandler}
            onSaveIndirizzo={saveIndirizzoHandler}
          />

        </div>
        <div className='row'>
          <div className='col-12 mt-1 mx-3 p-1'><h1>Inserisci un contatto</h1></div>
        </div>
        <div className='row'>
          <Form onSaveFormData={saveFormDataHandler}
            editedContatto={editedContatto}
          />
        </div>

        <Modale closeModal={settaIndirizzo}
          title="Indirizzo dell'utente"
          id="indirizzoModal">
          <div className="modal-body">
            <p>{indirizzo}</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" 
            data-bs-dismiss="modal">
            Chiudi</button>
          </div>

        </Modale>

        <Modale
          title="Eliminazione contatto"
          id="eliminaModal">
             <div className="modal-body">
             <p>Eliminare il contatto?</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary" 
            data-bs-dismiss="modal">
            Chiudi</button>
            <button type="button" className="btn btn-primary" 
            data-bs-dismiss="modal" onClick={deleteHandler}>
            Elimina</button>
          </div>
         
        </Modale>
      </div></>
  );

};

export default Home;
