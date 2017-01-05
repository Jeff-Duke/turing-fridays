import React, { Component } from 'react';
import { map, extend, invert } from 'lodash';
import firebase, { signIn, signOut, reference, adminReference } from '../firebase';
import SignIn from './SignIn';
import Spikes from './Spikes';
import Header from './Header';
import Admin from './Admin';
let admins = {};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      spikes: [],
      admins: [],
      showForm: false
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
    adminReference.limitToLast(100).on('value', (snapshot) => {
      admins = snapshot.val() || {};
      this.setState({
        admins: map(admins, (val) => val)
      });
      admins = invert(admins);
    });
  }

  newUser(newUser) {
    this.setState({ user: newUser });
  }

  newAdmin(e) {
    e.preventDefault();
    adminReference.push(e.target.email.value);
    e.target.email.value = '';
  }

  removeAdmin(email) {
    firebase.database().ref(`admins/${admins[email]}`).remove();
  }

  toggleForm() {
    this.setState({ showForm: !this.state.showForm });
  }

  createSpike(e) {
    e.preventDefault();
    const user = this.state.user;
    let { title, description, spikeDate } = e.target;
    if (title.value && description.value && spikeDate.value) {
      let spike = {
        title: title.value,
        description: description.value,
        location: '',
        appr: false,
        count: 0,
        createdAt: Date.now(),
        createdBy: user.email,
        attendees: [],
        spikeDate: spikeDate.value,
      };
      reference.push(spike);
      document.getElementById('ProposalForm').reset();
    } else {
      alert('description and title required');
    }
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

    if(this.state.admins.indexOf(user.email) !== -1) {
      return (
        <div className="Application">
          <Header user={user} />
          <Admin
            createSpike={(e) => this.createSpike(e)}
            spikes={this.state.spikes}
            admins={this.state.admins}
            showForm={this.state.showForm}
            toggleForm={() => this.toggleForm()}
            updateSpike={(spike, prop, value) => this.updateSpike(spike, prop, value)}
            deleteSpike={(spike) => this.deleteSpike(spike)}
            newAdmin={(email) => this.newAdmin(email)}
            removeAdmin={(index) => this.removeAdmin(index)}
          />
        </div>
      )
    }

    if (user) {
      return (
        <div className="Application">
          <Header user={user} />
          <Spikes
            createSpike={(e) => this.createSpike(e)}
            spikes={this.state.spikes}
            showForm={this.state.showForm}
            user={user}
            toggleForm={() => this.toggleForm()}
            updateCount={(spike) => this.updateCount(spike)}
          />
        </div>
      )
    }
  }
}
