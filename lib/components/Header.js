import React from 'react';
import { signOut } from '../firebase';


const Header = ({user}) => {
  return (
    <div>
      <p>
        Logged in as
        <span className="LogInName">
          {user.displayName}
        </span>
        ({user.email})
      </p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}

export default Header;
