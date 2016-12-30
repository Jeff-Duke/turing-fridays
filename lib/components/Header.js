import React from 'react';
import { signOut } from '../firebase';


const Header = ({user}) => {
  return (
    <header >
        <pre>Logged in as {user.email} </pre> 
      <button onClick={() => signOut()}>Sign Out</button>
    </header>
  )
}

export default Header;