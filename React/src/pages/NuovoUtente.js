import { useEffect } from "react";
import Form2 from "../form/Form2";
import useHttp from "../hook/use-http";
import { useHistory } from 'react-router-dom';

const NuovoUtente = () => {

    const history = useHistory();

    const { sendRequest } = useHttp({
        url: 'http://localhost:8000/users',
        method: 'POST',
        body:{
            
        }, 
        headers: {
            'Content-Type': 'application/json',
        }
    } 
    );

    const addUserHandler = () => {
       
        sendRequest();
        history.push('/tabella');
    }

    useEffect(() => {
        sendRequest();
    }, []);


    return (
        <Form2 onSaveFormData={addUserHandler}></Form2>
    )
}
export default NuovoUtente;



// json-server --watch data/db.json --port 8000