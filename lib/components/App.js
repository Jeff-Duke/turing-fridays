import React, { Component } from 'react';
import firebase, { signIn, signOut, reference } from '../firebase';
import SignIn from './SignIn';
import Spikes from './Spikes';
import Header from './Header';

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

  createSpike(e) {
    e.preventDefault()
    let { title, description } = e.target;
    let spike = {
      title: title.value,
      description: description.value,
      location: '',
      appr: false,
      count: 0,
      created_at: Date.now()
    }
    reference.push(spike)
  }

  render() {
    const user = this.state.user;

    if (!user) { return <SignIn /> }

    if (user) {
      return (
        <div>
          <Header user={user}/>
          <Spikes createSpike={this.createSpike}/>
        </div>
      )
    }
  }
}
