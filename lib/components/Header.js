import React from 'react';
import { signOut } from '../firebase';


const Header = ({user}) => {
  return (
    <header >
      <p>
        Logged in as {' '}
        <span className="LogInName">
          {user.displayName}{' '}
        </span>
        ({user.email})
      </p>
      <button onClick={() => signOut()}>Sign Out</button>
    </header>
  )
}

export default Header;
