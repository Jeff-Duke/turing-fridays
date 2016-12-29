import React, { Component } from 'react';
import firebase, { signIn, signOut } from '../firebase';
import SignIn from './SignIn';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((newUser) => this.newUser(newUser));
  }

  newUser(newUser) {
    this.setState({ user: newUser });
  }

  render() {
    const user = this.state.user;

    if (!user) { return <SignIn /> }

    if (user) {
      return (
        <div className="LogOut">
          <p className="LogText">
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
  }
}
