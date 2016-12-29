import React from 'react';
import { signIn } from '../firebase';

const SignIn = () => {
  return (
    <div className="LogIn">
      <button
        id="LogInButton"
        children="Log In"
        onClick={() => signIn()}
      />
    </div>
  );
}

export default SignIn
