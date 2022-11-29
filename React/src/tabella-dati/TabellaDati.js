import { faEye, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import '../tabella-dati/TabellaDati.css';
import '../tabella-dati/TabellaDati.scss';
import React, { useState } from 'react';
//import Alert from '../alert/Alert';
import Card from '../card/Card';

const TabellaDati = (props) => {
  const [show, setShow] = useState(true);

  const cliccaQui = () => {
    setShow((s) => !s);
  };

  const deleteContatto = (id) => {
    props.onDelete(id);
  
  };

  const trovaIndirizzo = (contatto) => {
    props.onSaveIndirizzo(contatto.indirizzo);
    
  };


  const modificaContatto = (contatto) => {
    props.onChange(contatto);
  };

 


  return (
    <div>
      <button type="button" className="btn btn-outline-success mx-1"
        onClick={cliccaQui}> Clicca </button>

      {!show &&
        //<Alert messaggio="Non sono presenti nuovi contatti"/>
        <Card dati=
          {props.contatti.map((card) =>

            <div className="col-sm-6" key={card.id}>
              <div className="card">

                <div className="card-body">
                  <h5 className="card-title">{card.id} {card.nome} {card.cognome} </h5>
                  <div className="card-text">
                    <p className="card-text">{card.email} {card.numero}</p>
                    <div><button type="button" className="btn btn-outline-success mx-1" data-bs-toggle="modal" data-bs-target="#exampleModal" ><FontAwesomeIcon icon={faEye}
                    />
                    </button>
                      <button type="button" className="btn btn-outline-success mx-1" onClick={() => modificaContatto(card)} ><FontAwesomeIcon icon={faPencilAlt}

                      /></button>
                      <button type="button" className="btn btn-outline-success mx-1" onClick={() => deleteContatto(card.id)}><FontAwesomeIcon icon={faTrashAlt}

                      /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          )} />

      }

      {show &&
        <div className="table-responsive">
          <table className='table'
          >
            <thead className='sfondo'>
              <tr >
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Cognome</th>
                <th scope="col">Email</th>
                <th scope="col">Numero di telefono</th>

                <th scope="col">Modifica</th>
              </tr>
            </thead>
            <tbody>

              {props.contatti.map((contatto, index) =>
                <tr key={contatto.id} className= {` ${index % 2===0 ? 'gray' : ''}`}
                >
                  <th scope="row">{contatto.id}</th>
                  <td>{contatto.nome}</td>
                  <td>{contatto.cognome}</td>
                  <td>{contatto.email}</td>
                  <td>{contatto.numero}</td>


                  <td>

                    {//(index % 2 === 0) &&
                      <button type="button" className="btn btn-outline-success mx-1" data-bs-toggle="modal" data-bs-target="#indirizzoModal" 
                        onClick={() => trovaIndirizzo(contatto)} ><FontAwesomeIcon icon={faEye}
                        />
                      </button>}
                    <button type="button" className="btn btn-outline-success mx-1" onClick={() => modificaContatto(contatto)}><FontAwesomeIcon icon={faPencilAlt}

                    /></button>
                    <button type="button" className="btn btn-outline-success mx-1" data-bs-toggle="modal" data-bs-target="#eliminaModal" 
                    onClick={() => deleteContatto(contatto.id)}
                     ><FontAwesomeIcon icon={faTrashAlt}
                      /></button>   

            

                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      }

    </div>


  );

};

export default TabellaDati;
