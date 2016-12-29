import React, { Component } from 'react';
import firebase, { signIn, signOut } from '../firebase';

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
