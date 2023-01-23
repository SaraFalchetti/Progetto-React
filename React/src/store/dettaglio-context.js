import React, { useState} from "react";
//import useHttp from "../hook/use-http";

const DettaglioContext = React.createContext({
  utente: '',
 onDati:()=>{}
});

export const DettaglioContextProvider = (props) => {

  const [utente, setDatiUtente] = useState(null);

   const datiUtente=(utenteDato)=>{
   
    setDatiUtente(utenteDato);
  } 


  return <DettaglioContext.Provider value=
    {{
      utente: utente,
      onDati:datiUtente

    }}>
    {props.children}
  </DettaglioContext.Provider>
}

export default DettaglioContext;
