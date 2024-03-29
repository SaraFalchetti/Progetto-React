import { faEye, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import '../tabella-dati/TabellaDati.css';
import '../tabella-dati/TabellaDati.scss';
import React from 'react';
import { Link} from 'react-router-dom';
//import { useHistory } from 'react-router-dom';

const TabellaDati = (props) => {


 // const history=useHistory();

  const deleteContatto = (id) => {
    props.onDelete(id);

  };

  const trovaIndirizzo = (contatto) => {
    props.onSaveIndirizzo(contatto.indirizzo);

  };

  
  /*   const modificaContatto = (contatto) => {
     props.onChange(contatto);
      
   };  */


   /* const dettaglioHandler=(contatto)=>{
   history.push(`/tabella/dettaglio/${contatto.id}`);
   props.onSaveContatto(contatto);

   }; */



  return (
    < div className='row'>
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
              <tr key={contatto.id} className={` ${index % 2 === 0 ? 'gray' : ''}`}
              >

                <th scope="row">
                  {contatto.id}
                </th>

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

                  <Link to={`/tabella/dettaglio/${contatto.id}`}> 
                    <button type="button" className="btn btn-outline-success mx-1"
                   //  onClick={() => modificaContatto(contatto)}
                   // onClick={()=>dettaglioHandler(contatto)}
                    ><FontAwesomeIcon icon={faPencilAlt}
                      /></button>
                   </Link>  


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
    </div >
  );

};

export default TabellaDati;
