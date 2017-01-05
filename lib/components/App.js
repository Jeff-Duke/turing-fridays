import React, { Component } from 'react';
import { map, extend, invert, uniq } from 'lodash';
import firebase, { signIn, signOut, reference, adminReference } from '../firebase';
import SignIn from './SignIn';
import Spikes from './Spikes';
import Header from './Header';
import Admin from './Admin';
import moment from 'moment';
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
    let { email } = e.target;
    if (email.value) {
      adminReference.push(e.target.email.value);
      e.target.email.value = '';
    } else {
      alert('You must enter an email');
    }
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
    let { title, description, spikeDate, hosts, notes } = e.target;
    if (title.value && description.value && spikeDate.value) {
      let spike = {
        title: title.value,
        description: description.value,
        location: '',
        appr: false,
        count: 0,
        createdAt: Date.now(),
        createdBy: user.email,
        hosts: hosts.value,
        attendees: [],
        spikeDate: new Date(spikeDate.value).getTime(),
        notes: notes.value
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

  dateOptions(spikes) {
    let dates = uniq(map(spikes, (spike) => spike.spikeDate)).sort((a,b) => a > b);
    return map(dates, (date, index) => {
      return <option key={index} value={date}>{moment(date).format('MM-DD-YYYY')}</option>
    })
  }

  render() {
    const user = this.state.user;
    if (!user) { return <SignIn /> }

    if(this.state.admins.indexOf(user.email) !== -1) {
      return (
        <section className="Application">
          <Header
            user={user}
            createSpike={(e) => this.createSpike(e)}
            showForm={this.state.showForm}
            toggleForm={() => this.toggleForm()}
            />
          <Admin
            createSpike={(e) => this.createSpike(e)}
            spikes={this.state.spikes}
            admins={this.state.admins}
            updateSpike={(spike, prop, value) => this.updateSpike(spike, prop, value)}
            deleteSpike={(spike) => this.deleteSpike(spike)}
            newAdmin={(email) => this.newAdmin(email)}
            removeAdmin={(index) => this.removeAdmin(index)}
            dateOptions={this.dateOptions}
          />
        </section>
      )
    }

    if (user) {
      return (
        <section className="Application">
          <Header
            user={user}
            createSpike={(e) => this.createSpike(e)}
            showForm={this.state.showForm}
            toggleForm={() => this.toggleForm()}
          />
          <Spikes
            createSpike={(e) => this.createSpike(e)}
            spikes={this.state.spikes}
            user={user}
            updateCount={(spike) => this.updateCount(spike)}
            dateOptions={this.dateOptions}
          />
        </section>
      )
    }
  }
}
