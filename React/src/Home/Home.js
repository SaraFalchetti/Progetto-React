import React, { useState } from 'react';
import { faEye, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TabellaDati from '../tabella-dati/TabellaDati';
import Form from '../form/Form';
import Modale from '../modale/Modale';
import Card from '../card/Card';


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
  const [id, setId] = useState(null);

  const [show, setShow] = useState(true);


  const cliccaQui = () => {
    setShow((s) => !s);
  };

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

  const prendiId = (id) => {
    setId(id)
  }


  return (
    <>
      <div className='row'>
        <div className='col-12 mt-2 mx-3 p-1 '><h1>Rubrica</h1></div>
      </div>
      <div className='row'>
        <div className='col-sm-12 col-md-10 col-lg-8'>
          <button type="button" className="btn btn-outline-success mx-1"
            onClick={cliccaQui}> Clicca </button>

          {show &&
            <TabellaDati contatti={dati}
              onDelete={prendiId}
              onChange={modificaHandler}
              onSaveIndirizzo={saveIndirizzoHandler}
            />
          }

          <div className='row'>

            {!show && dati.map((card) =>
              <Card key={card.id}>
                
                    <h5 className="card-title"> {card.id} {card.nome}
                      {card.cognome}
                    </h5>
                    <div className="card-text">
                      <p className="card-text"> {card.email} {card.numero} </p>
                      <div>
                        <button type="button" className="btn btn-outline-success mx-1" data-bs-toggle="modal" data-bs-target="#indirizzoModal"
                          onClick={() => saveIndirizzoHandler(card.indirizzo)}
                        ><FontAwesomeIcon icon={faEye} />
                        </button>

                        <button type="button" className="btn btn-outline-success mx-1" onClick={() => modificaHandler(card)}
                        ><FontAwesomeIcon icon={faPencilAlt} /></button>

                        <button type="button" className="btn btn-outline-success mx-1" data-bs-toggle="modal" data-bs-target="#eliminaModal"
                          onClick={() => prendiId(card.id)}
                        ><FontAwesomeIcon icon={faTrashAlt} /></button>
                      </div>
                    </div>
                
              </Card>)
            }
          </div>
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
