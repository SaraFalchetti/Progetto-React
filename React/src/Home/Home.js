import React, { useState, useEffect } from 'react';
//import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useHttp from '../hook/use-http';
import { faEye, faPencilAlt, faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TabellaDati from '../tabella-dati/TabellaDati';
//import Form from '../form/Form';
//import Modale from '../UI/Modale';
import Card from '../UI/Card';
import Loading from '../UI/Loading';
//import Form2 from '../form/Form2';
import Modale2 from '../UI/Modale2';
import Filtro from '../filtro/Filtro';
//import DettaglioContext from "../store/dettaglio-context";
import Pagination from '../tabella-dati/Pagination';
import Click from '../click/Click';

const Home = () => {
  const [dati, setDati] = useState([]);
  const [indirizzo, setIndirizzo] = useState(null);
  //Ricerca
  //const [value, setValue] = useState("");

  // const [editedContatto, setEditedContatto] = useState(null); 
  //MODIFICA,spostato in dettaglio

  const [id, setId] = useState(null);

  const [show, setShow] = useState(true);
  const [spin, setSpin] = useState(true);

  const [nomeCerca, setNomeCerca] = useState("");
  const [cognomeCerca, setCognomeCerca] = useState("");
  const [numeroCerca, setNumeroCerca] = useState("");

  //PAGINAZIONE
  const [currentPage, setCurrentPage] = useState(1); //pagina di default è 1
  const [contattiPerPage] = useState(8);//quanti contatti per pagina


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

  const { sendRequest: fetchUser } = useHttp();

  useEffect(() => {
    fetchUser({ url: 'http://localhost:8000/users' }, userData);
  }, []);

//REDUX
  const isClicked = useSelector(state => state.click.isClicked);
  const username= useSelector(state => state.click.username);
  const usernameAuth= useSelector(state => state.auth.username);
  const isLogged= useSelector(state => state.auth.isLogged);


  
  //get current Contatti nella pagina della tabella 
  const indexOfLastCont = currentPage * contattiPerPage;
  const indexOfFristCont = indexOfLastCont - contattiPerPage;
  const currentContatti = dati.slice(indexOfFristCont, indexOfLastCont);

  const cliccaQui = () => {
    setShow((s) => !s);
  };

  const mostraSpinner = () => {
    setSpin((s) => !s);

  }
  /* 
     const modificaHandler = (contatto) => {
       setEditedContatto(contatto);
   
     }; 
  
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
    };*/

  const saveIndirizzoHandler = (address) => {
    setIndirizzo(address);

  };

  const settaIndirizzo = () => {
    setIndirizzo(null);
  };

  //DELETE DEL CONTATTO
  const { sendRequest: deleteUser } = useHttp();

  const deleteHandler = () => {
    setDati((prevState) => prevState.filter(cont => cont.id !== id));
    deleteUser({ url: `http://localhost:8000/users/${id}`, method: 'DELETE' });

  };

  const prendiId = (id) => {
    setId(id)
  }


  /////////////////////////////////////////////
  /* const ctx = useContext(DettaglioContext);

  const dettaglioHandler = (contatto) => {

    ctx.onDati(contatto);
  } 

  const datiUtente = JSON.stringify(ctx.utente)*/
  ////////////////////////////////////////////
  //change della pagina
  const paginate = pageNumber => setCurrentPage(pageNumber);

  //////////////////////
  //FILTRO CERCA lato back
  /* const handleSearch = (e) => {
   e.preventDefault();
   return fetchUser({ url: `http://localhost:8000/users?name=${value}` }, userData);

 };*/

  //Filtro lato front

  const changeSearchNome = (e) => {
    setNomeCerca(e.target.value)
  };
  const changeSearchCognome = (e) => {
    setCognomeCerca(e.target.value)
  };
  const changeSearchNumero = (e) => {
    setNumeroCerca(e.target.value)
  };


  const handleSearchNome = () => {
    const filtroNome = dati.filter((item) =>
      item.nome.toLowerCase().includes(nomeCerca.toLowerCase()));
    setDati(filtroNome);
  };
  const handleSearchCognome = () => {
    const filtroCognome = dati.filter((item) =>
      item.cognome.toLowerCase().includes(cognomeCerca.toLowerCase()));
    setDati(filtroCognome);
  };
  const handleSearchNumero = () => {
    const filtroNumero = dati.filter((item) =>
      item.numero.toLowerCase().includes(numeroCerca.toLowerCase()));
    setDati(filtroNumero);
  };


  return (
    <>
      <div className='row'>
        <div className='col-12 mt-2 mx-3 p-1 '><h1>Rubrica</h1></div>
      </div>
      <div className='row'>
        <div className='col-sm-12 col-md-10 col-lg-8'>
          <button type="button" className="btn btn-outline-success mx-1"
            onClick={cliccaQui}> Card </button>

          <button type="button" className="btn btn-outline-success mx-1"
            onClick={mostraSpinner}>
            Spinner</button>

          <Link to="/dettaglio" >
            <button type="button" className="btn btn-outline-success mx-1">
              Inserisci un contatto</button>
          </Link>

          <Link to="/postUtenti" >
            <button type="button" className="btn btn-outline-success mx-1">
              Posts</button>
          </Link>

          {/* FILTRO RICERCA */}
          {/* <Filtro title={"Ricerca"}>
            <form className="form-inline" onSubmit={handleSearch}>
              <input type="text"
                className='form-control'
                placeholder='Search'
                value={value}
                onChange={(e) => setValue(e.target.value)} />

              <button type="submit"
                className="btn btn-outline-success mx-1"
              > Cerca</button>

            </form>
          </Filtro> */}


          {/* FILTRO RICERCA */}

          <div className="col-3">
            <Filtro title={"Ricerca per:"}>
              <div className="col-sm-6 p-1 input-group">
                <input type="text" className="form-control mr-sm-2" id="InputNome" placeholder="Nome" aria-label="Search"
                  value={nomeCerca}
                  onChange={changeSearchNome}
                />
                <button type="button" className="btn btn-outline-success"
                  onClick={handleSearchNome}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
              <div className="col-sm-6 p-1 input-group">
                <input className="form-control mr-sm-2" type="text" id="InputCognome" placeholder="Cognome" aria-label="Search"
                  value={cognomeCerca}
                  onChange={changeSearchCognome}
                />
                <button type="button" className="btn btn-outline-success"
                  onClick={handleSearchCognome}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
              <div className="col-sm-6 p-1 input-group">
                <input className="form-control mr-sm-2" id="InputNumero" type="text" placeholder="Numero" aria-label="Search"
                  value={numeroCerca}
                  onChange={changeSearchNumero}
                />
                <button type="button" className="btn btn-outline-success"
                  onClick={handleSearchNumero}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </Filtro>
          </div>


          {/* per il context: <div>
            <p>{datiUtente}</p>
          </div> */}

          {show &&
            <>
              <TabellaDati
                //contatti={dati}
                contatti={currentContatti}
                onDelete={prendiId}
                onSaveIndirizzo={saveIndirizzoHandler}
              //  contatti={handleSearchCognome(dati)}
              // onChange={modificaHandler} //MODIFICA
              //onSaveContatto={dettaglioHandler}
              >
              </TabellaDati>

              <Pagination contattiPerPage={contattiPerPage}
                totalContatti={dati.length}
                paginate={paginate}
              />
            </>
          }

          {!isClicked && <Click />}
          {isClicked &&  `L'username è: ${username}`}
          {isLogged && console.log(usernameAuth)}
          

          <Modale2
            title="Clicca qui"
            id="Modal">
            <div className="modal-body">
              <p>Clicca qui</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary"
                data-bs-dismiss="modal">
                Chiudi</button>
            </div></Modale2>



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
