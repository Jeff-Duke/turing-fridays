import React, { Component } from 'react';
import { map, extend } from 'lodash';
import firebase, { signIn, signOut, reference, adminReference } from '../firebase';
import SignIn from './SignIn';
import Spikes from './Spikes';
import Header from './Header';
import Admin from './Admin';

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
      const admins = snapshot.val() || {};
      this.setState({
        admins: map(admins, (val) => val)
      });
    });
  }

  newUser(newUser) {
    this.setState({ user: newUser });
  }

  newAdmin(email) {
    adminReference.push(email);
  }

  toggleForm() {
    this.setState({ showForm: !this.state.showForm });
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
            toggleForm={() => this.toggleForm()}
            updateCount={(spike) => this.updateCount(spike)}
          />
        </div>
      )
    }
  }
}
