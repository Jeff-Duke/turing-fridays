import React, { Component } from 'react';
import { map, extend } from 'lodash';
import firebase, { signIn, signOut, reference } from '../firebase';
import SignIn from './SignIn';
import Spikes from './Spikes';
import Header from './Header';
import Admin from './Admin';
import allAdmins from '../allAdmins';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      spikes: [],
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((newUser) => this.newUser(newUser));
    reference.limitToLast(100).on('value', (snapshot) => {
      const spikes = snapshot.val() || {};
      this.setState({
        spikes: map(spikes, (val, key) => extend(val, { key }))
      });
    });
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

  approveSpike(key) {
    firebase.database().ref(`spikes/${key}`).update({ appr: true });
  }

  render() {
    const user = this.state.user;

    if (!user) { return <SignIn /> }
    if(!allAdmins.indexOf(user.email)) {
      return (
        <div>
          <Header user={user} />
          <Admin createSpike={this.createSpike} spikes={this.state.spikes}
            approveSpike={this.approveSpike}
          />
        </div>
      )
    }

    if (user) {
      return (
        <div>
          <Header user={user}/>
          <Spikes createSpike={this.createSpike} spikes={this.state.spikes}/>
        </div>
      )
    }
  }
}
