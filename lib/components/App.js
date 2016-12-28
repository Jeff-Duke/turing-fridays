import React, { Component } from 'react';
import SignIn from './SignIn';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
    };
  }
  render() {
    return (
      <div>
        <h1>Hello!</h1>
        <SignIn handleUser={(newUser) => this.setState({ user: newUser })} />
      </div>
    )
  }
}
