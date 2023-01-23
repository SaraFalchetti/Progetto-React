import React, { useState} from "react";
import useHttp from '../hook/use-http';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  onLogout: () => { },
  onLogIn: (token) => { }
});


export const AuthContextProvider = (props) => {

 const initialToken=localStorage.getItem("token")

 const [isLoggedIn, setIsLoggedIn] = useState(!!initialToken);

  const [token, setToken] = useState(initialToken);

  const { sendRequest: fetchToken } = useHttp();

  const loginHandler = () => {

    const tokenData = dato => {
      const token_data = dato.data;
      setToken(token_data);
       localStorage.setItem('token', token_data);
       setIsLoggedIn(true)
    };

    fetchToken({ url: 'http://localhost:8000/token' }, tokenData);
    
  };


  const logoutHandler = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsLoggedIn(false)

  };

  return <AuthContext.Provider value={{
    token: token,
    isLoggedIn: isLoggedIn,
    onLogout: logoutHandler,
    onLogIn: loginHandler
  }}>
    {props.children}
  </AuthContext.Provider>

}

export default AuthContext;

/* return <AuthContext.Provider  value={{
    
    isLoggedIn: isLoggedIn,
    onLogout: logoutHandler,
    onLogIn: loginHandler
   }}>
    {props.children}
</AuthContext.Provider> */

/* useEffect(() => {

  const storedUserLoggedInInformation = localStorage.getItem('token');


  if (storedUserLoggedInInformation === token) {
      setIsLoggedIn(true);
    }

}, []); */

/* altro esercizio
 const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token) => {},
    logout: () => {},
  }); */


/* useEffect(() => {
    // const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
     const storedUserLoggedInInformation = localStorage.getItem('token');
 
     /* if (storedUserLoggedInInformation === '1') {
       setIsLoggedIn(true);
     } 

     if (storedUserLoggedInInformation === token) {
         setIsLoggedIn(true);
       }

   }, []);
   
   
   useEffect(() => {

  }, []);*/