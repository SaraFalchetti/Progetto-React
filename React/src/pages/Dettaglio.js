import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../hook/use-http";
import { DatiUtenti } from "../lib/api";

const Dettaglio = () => {
    const [persona, setPersona] = useState([]);

    const params = useParams();

    const { userId } = params;

    const url = 'https://jsonplaceholder.typicode.com/users';

    const datiUtenti = data => {
        const dato = {
            id: data.id,
            nome: data.name,
            email: data.email,
            numero: data.phone,
            indirizzo: data.address["street"]
        }
        setPersona(dato);

    };


    const { sendRequest } = useHttp({ url: `${url}/${userId}` }, datiUtenti);

    useEffect(() => {
        sendRequest(userId);
    }, []);


    return (
        <>
            <p>Dettagli dell'utente</p>
            <p>{params.userId}</p>
            <p>{persona.nome}</p>
            <p>{persona.email}</p>
            <p>{persona.numero}</p>
            <p>{persona.indirizzo}</p>
            
            
        </>
    )
}

export default Dettaglio;