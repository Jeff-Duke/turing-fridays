import React, { Component } from 'react';
import { map, extend } from 'lodash';
import firebase, { signIn, signOut, reference } from '../firebase';
import SignIn from './SignIn';
import Spikes from './Spikes';
import Header from './Header';
import Admin from './Admin';
import allAdmins from '../allAdmins';
let firebaseUser = null;

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      spikes: [],
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((newUser) => {
      this.newUser(newUser);

      //temporary fix until we figure out how to access the firebase user inside of the scoped
      //createSpike function
      firebaseUser = newUser;
    });
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
    e.preventDefault();
    let { title, description } = e.target;
    let spike = {
      title: title.value,
      description: description.value,
      location: '',
      appr: false,
      count: 0,
      createdAt: Date.now(),
      user: firebaseUser.email
    };
    reference.push(spike);
    document.getElementById("proposalForm").reset()
  }

  updateSpike(spike, prop, value) {
    spike[prop] = value;
    firebase.database().ref(`spikes/${spike.key}`).update( spike );
  }

  deleteSpike(spike) {
    firebase.database().ref(`spikes/${spike.key}`).remove();
  }

  render() {
    const user = this.state.user;

    if (!user) { return <SignIn /> }

    if(!allAdmins.indexOf(user.email)) {
      return (
        <div>
          <Header user={user} />
          <Admin createSpike={this.createSpike} spikes={this.state.spikes}
            updateSpike={this.updateSpike}
            deleteSpike={this.deleteSpike}
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
