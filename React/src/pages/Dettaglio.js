import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hook/use-http";
import Form2 from "../form/Form2";
import FormFormik from "../form/FormFormik";

const Dettaglio = () => {

    const [editedContatto, setEditedContatto] = useState(null);
   
    const params = useParams();

    const { userId } = params;

    const url = 'http://localhost:8000/users';

    const datiUtenti = data => {
        let nomeSplit = data.name.split(" ");
        const dato = {
            id: data.id,
            nome: nomeSplit[0],
            cognome: nomeSplit[1],
            email: data.email,
            numero: data.phone,
            indirizzo: data.address["street"]
        }
        setEditedContatto(dato);
    };
    //Get:
    const { sendRequest: getUtentiHandler } = useHttp();
    //Modifica:
    const { sendRequest: modificaHandler } = useHttp();
    //Post:
    const { sendRequest: postNuoviUtenti } = useHttp();

    //POST: AGGIUNTA DI UN NUOVO UTENTE

    //Set dati nella post:
    const utenteToDto = data => {
        const newUtente =
        {
            id: data.id,
            name: data.nome + " " + data.cognome,
            email: data.email,
            phone: data.numero,
            address: {
                "street": data.indirizzo
            }
        }
        return (newUtente)
    };

    const addUserHandler = (user) => {

        postNuoviUtenti({
            url: `${url}`,
            method: 'POST',
            body: (utenteToDto(user)),
            headers:
            {
                'Content-Type': 'application/json',
            }
        }
        );
       
    };

    useEffect(() => {
        if(userId){
              getUtentiHandler({
            url: `${url}/${userId}`
        }, datiUtenti);
        }
    }, []);

   
 
    //MODIFICA:
    const modificaUser = (user) => {

        modificaHandler({
            url: `${url}/${userId}`,
            method: 'PUT',
            body: (utenteToDto(user)),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        
    };

    const creaEModifica=(el)=>{
        if(userId){
            modificaUser(el);
        }else{
            addUserHandler(el);
        }
    };


 
    return (
        <>

             {/* <Form2 
                editedContatto={editedContatto}
                onSaveFormData={creaEModifica}
            ></Form2>*/}

           
           <FormFormik 
              editedContatto={editedContatto}
                onSaveFormData={creaEModifica}>
            </FormFormik> 
 
        </>
    )
}

export default Dettaglio;

//json-server --watch data/db.json --port 8000
