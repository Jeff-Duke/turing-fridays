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
    firebase.auth().onAuthStateChanged((newUser) => {
      this.newUser(newUser);
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
    const user = this.state.user;
    let { title, description } = e.target;
    let spike = {
      title: title.value,
      description: description.value,
      location: '',
      appr: false,
      count: 0,
      createdAt: Date.now(),
      createdBy: user.email,
      attendees: []
    };
    reference.push(spike);
    document.getElementById('ProposalForm').reset();
  }

  updateSpike(spike, prop, value) {
    spike[prop] = value;
    firebase.database().ref(`spikes/${spike.key}`).update( spike );
  }

  deleteSpike(spike) {
    firebase.database().ref(`spikes/${spike.key}`).remove();
  }

  updateCount(spike) {
    const user = this.state.user;
    if (!spike.attendees) {
      Object.assign(spike, {attendees: [user.email]});
    }
    else if (spike.attendees.includes(user.email)) {
      spike.attendees = spike.attendees.filter(attendee => attendee !== user.email);
    }
    else {
      spike.attendees.push(user.email);
    }
    firebase.database().ref(`spikes/${spike.key}`).update( spike );
  }

  render() {
    const user = this.state.user;

    if (!user) { return <SignIn /> }

    if(allAdmins.indexOf(user.email) !== -1) {
      return (
        <div className="Application">
          <Header user={user} />
          <Admin
            createSpike={(e) => this.createSpike(e)}
            spikes={this.state.spikes}
            updateSpike={(spike, prop, value) => this.updateSpike(spike, prop, value)}
            deleteSpike={(spike) => this.deleteSpike(spike)}
          />
        </div>
      )
    }

    if (user) {
      return (
        <div className="Application">
          <Header user={user}/>
          <Spikes
            createSpike={(e) => this.createSpike(e)}
            spikes={this.state.spikes}
            updateCount={(spike) => this.updateCount(spike)}
          />
        </div>
      )
    }
  }
}
