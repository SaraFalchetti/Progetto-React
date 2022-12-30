import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hook/use-http";
import Form2 from "../form/Form2";
import { useHistory } from 'react-router-dom';
import  Alert  from "../alert/Alert";


const Dettaglio = (props) => {

    const [editedContatto, setEditedContatto] = useState(null);
    const[postContatto,setPostContatto]=useState(null);

    //const history = useHistory();

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


    const { sendRequest: getUtentiHandler } = useHttp({
        url: `${url}/${userId}`
    }, datiUtenti);

//POST: AGGIUNTA DI UN NUOVO UTENTE

 const postUtenti = data => {
    const post = {
        id: data.id,
        name: data.nome,
        email: data.email,
        phone: data.numero,
        address:{
            "street":data.indirizzo
        }
    }
    setEditedContatto(post);

};  
 
       const addUserHandler= async(user)=>{
        const response=await fetch('http://localhost:8000/users', {
            method:'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            }
        }
        );
        const data= await response.json();

        console.log(data);   
        
    };
     
    
    //Con resquest usehttp:
    /*   const { sendRequest: postNuoviUtenti } = useHttp({
        url: `${url}`,
        method:'POST',
        body: (editedContatto),
        headers: {
            'Content-Type': 'application/json',
        }

    }, postUtenti);

    const addUserHandler=()=>{
        postNuoviUtenti();
    }

     */



    useEffect(() => {
        getUtentiHandler(userId);

    }, []);

    
//MODIFICA:
    /*  const { sendRequest: modificaHandler } = useHttp({
        url: `${url}/${editedContatto.id}`,

        method: 'PUT',
        body: (editedContatto),
        headers: {
            'Content-Type': 'application/json',
        }
    }, datiUtenti);

    const modificaUser = () => {
     modificaHandler(); 
        

        setEditedContatto(null);
        history.push('/tabella');
        console.log()
    }  */



    return (
        <>
            <Form2
                editedContatto={editedContatto}
               //onSaveFormData={modificaUser}
            onSaveFormData={addUserHandler} 
            ></Form2>

            
        </>
    )
}

export default Dettaglio;
