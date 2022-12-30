import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import useHttp from '../hook/use-http';
import { faEye, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TabellaDati from '../tabella-dati/TabellaDati';
//import Form from '../form/Form';
//import Modale from '../UI/Modale';
import Card from '../UI/Card';
import Loading from '../UI/Loading';
//import Form2 from '../form/Form2';
import Modale2 from '../UI/Modale2';
import Filtro from '../filtro/Filtro';


const Home = () => {
  const [dati, setDati] = useState([]);
  const [indirizzo, setIndirizzo] = useState(null);

  const [editedContatto, setEditedContatto] = useState(null); //MODIFICA,spostato in dettaglio

  const [id, setId] = useState(null);

  const [show, setShow] = useState(true);
  const [spin, setSpin] = useState(true);

  const [nomeCerca, setNomeCerca] = useState("");
  


  /*Chiamata http */
  const userData = data => {
    const user_array = data.map(
      userData => {
        let nomeSplit = userData.name.split(" ");
        return {
          id: userData.id,
          nome: nomeSplit[0],
          cognome: nomeSplit[1],
          email: userData.email,
          numero: userData.phone,
          indirizzo: userData.address["street"]
        }
      });
    setDati(user_array)
  };

  const { sendRequest: fetchUser } =
    useHttp({ url: 'http://localhost:8000/users' }, userData);

  useEffect(() => {
    fetchUser();
  }, []);


  const cliccaQui = () => {
    setShow((s) => !s);
  };

  const mostraSpinner = () => {
    setSpin((s) => !s);

  }

  /*  const modificaHandler = (contatto) => {
     setEditedContatto(contatto);
 
   }; */

  const saveFormDataHandler = (data) => { //MODIFICA

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

//DELETE DEL CONTATTO
  const { sendRequest: deleteUser } =
    useHttp({ url: `http://localhost:8000/users/${id}`, method: 'DELETE' }, userData);

  const deleteHandler = () => {
    setDati((prevState) => prevState.filter(cont => cont.id !== id));
    deleteUser();

  };

  const prendiId = (id) => {
    setId(id)
  }

  const handleSearch = (data) => {
    return data.filter((item) => item.nome.toLowerCase().includes(nomeCerca.toLowerCase()));

  }


  return (
    <>
      <div className='row'>
        <div className='col-12 mt-2 mx-3 p-1 '><h1>Rubrica</h1></div>
      </div>
      <div className='row'>
        <div className='col-sm-12 col-md-10 col-lg-8'>
          <button type="button" className="btn btn-outline-success mx-1"
            onClick={cliccaQui}>  Clicca </button>

          <button type="button" className="btn btn-outline-success mx-1"
            onClick={mostraSpinner}>
            Spinner</button>

          <Link to="/dettaglio">
            <button type="button" className="btn btn-outline-success mx-1">
              Inserisci un contatto</button>
          </Link>

          <Filtro title={"Ricerca"}>
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
              onChange={(e) => setNomeCerca(e.target.value)} />
          </Filtro>

          {show &&
            <TabellaDati
              contatti={handleSearch(dati)}
              onDelete={prendiId}
              //onChange={modificaHandler} MODIFICA
              onSaveIndirizzo={saveIndirizzoHandler}
            >
            </TabellaDati>
          }

          {!spin && <Loading></Loading>}

          <div className='row'>
            {!show && dati.map((card) =>
              <div className='col-sm-6 p-1' key={card.id}>
                <Card titleId={card.id}
                  titleNome={card.nome}
                  titleCognome={card.cognome}>

                  <div className="card-text">
                    <p className="card-text"> {card.email} {card.numero} </p>
                    <div>
                      <button type="button" className="btn btn-outline-success mx-1" data-bs-toggle="modal" data-bs-target="#indirizzoModal"
                        onClick={() => saveIndirizzoHandler(card.indirizzo)}
                      ><FontAwesomeIcon icon={faEye} />
                      </button>

                      <button type="button" className="btn btn-outline-success mx-1" /* onClick={() => modificaHandler(card)} */
                      ><FontAwesomeIcon icon={faPencilAlt} /></button>

                      <button type="button" className="btn btn-outline-success mx-1" data-bs-toggle="modal" data-bs-target="#eliminaModal"
                        onClick={() => prendiId(card.id)}
                      ><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </div>
                  </div>

                </Card>
              </div>)
            }
          </div>
        </div>

        {/* FORM 
        <div className='row'>
          <div className='col-12 mt-1 mx-3 p-1'><h1>Inserisci un contatto</h1></div>
        </div>
        <div className='row'>
          <Form2
            onSaveFormData={saveFormDataHandler}
            editedContatto={editedContatto}
          />
        </div> */}


        <Modale2 closeModal={settaIndirizzo}
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
        </Modale2>

        <Modale2
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
        </Modale2>




        {/*
         Modale di prima senza il Portal:
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

        </Modale>*/}

      </div></>
  );



};

export default Home;
