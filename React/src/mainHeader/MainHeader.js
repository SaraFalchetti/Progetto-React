import React from 'react';
import Navigation from './Navigation';


const MainHeader = (props) => {
  return (
    <header>
      <Navigation isLoggedIn={props.isAuthenticated} onLogout={props.onLogout} />
    </header>
  );
};

export default MainHeader;
