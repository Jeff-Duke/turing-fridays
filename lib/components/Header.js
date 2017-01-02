import React from 'react';
import { signOut } from '../firebase';


const Header = ({user}) => {
  return (
    <header >
      <img className="Logo" src="https://www.turing.io/sites/default/files/turing-logo_1_0.png" />
      <h1 className="HeaderTitle">Turing Fridays</h1>
      <div className="LoginInfo">
        <img className="UserPhoto" src={user.photoURL} />
        <pre className="UserEmail">Logged in as {user.email}</pre>
        <button className="SignOut" onClick={() => signOut()}>Sign Out</button>
      </div>
    </header>
  )
}

export default Header;
