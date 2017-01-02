import React from 'react';
import { signIn } from '../firebase';

const SignIn = () => {
  return (
    <div className="SignIn">
      <h1>Turing Friday Schedule</h1>
      <button
        id="LogInButton"
        children="Login"
        onClick={() => signIn()}
      />
    </div>
  );
}

export default SignIn;
