import React, { Component } from 'react';
import { map, extend, invert, uniq } from 'lodash';
import firebase, { signIn, signOut, reference, adminReference, speakerReference, gearUpReference } from '../firebase';
import SignIn from './SignIn';
import Spikes from './Spikes';
import Header from './Header';
import Admin from './Admin';
import moment from 'moment';
import GuestSpeaker from './GuestSpeaker'
let admins = {};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      admins: [],
      attending: null,
      showForm: false,
      speaker: [],
      spikes: [],
      gearUp: [],
      user: null
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
      this.setAttending();
    });

    adminReference.limitToLast(100).on('value', (snapshot) => {
      admins = snapshot.val() || {};
      this.setState({
        admins: map(admins, (val) => val)
      });
      admins = invert(admins);
    });
    speakerReference.limitToLast(1).on('value', (snapshot) => {
      const speakers = snapshot.val() || {};
      this.setState({
        speaker: map(speakers, (val, key) => extend(val, { key }))
      });
    });
    gearUpReference.limitToLast(1).on('value', (snapshot) => {
      const gearups = snapshot.val() || {};
      console.log(gearups);
      this.setState({
        gearUp: map(gearups, (val, key) => extend(val, { key }))
      });
    });
    console.log(firebase.database().ref('gearUp'));
  }

  setAttending() {
    const { spikes, user } = this.state;
    spikes.map((spike) => {
      if(!!spike.attendees) {
        if(spike.attendees.includes(user.email)) {
          this.setState({ attending: spike });
        }
      }
    });
  }

  updateAttending(spike) {
    if (this.state.attending) {
      this.leaveSpike(this.state.attending);
    }
    spike ? this.setState({ attending: spike }) : this.setState({ attending: null });
  }

  updateCount(spike) {
    const user = this.state.user;
    if (!spike.attendees) {
      let attendees = [];
      attendees.push(user.email);
      this.updateSpike(spike, 'attendees', attendees);
      this.updateAttending(spike);
    }
    else if (spike.attendees.includes(user.email)) {
      this.updateAttending();
    }
    else {
      let attendees = spike.attendees.concat(user.email);
      this.updateSpike(spike, 'attendees', attendees);
      this.updateAttending(spike);
    }
  }

  newUser(newUser) {
    this.setState({ user: newUser });
  }

  newAdmin(e) {
    e.preventDefault();
    let { email } = e.target;
    if (email.value) {
      adminReference.push(email.value);
      email.value = '';
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
        title: this.sanitizeInput(title.value),
        description: this.sanitizeInput(description.value),
        location: '',
        appr: false,
        createdAt: Date.now(),
        createdBy: this.sanitizeInput(user.email),
        hosts: this.sanitizeInput(hosts.value),
        attendees: [],
        spikeDate: new Date(spikeDate.value).getTime(),
        notes: this.sanitizeInput(notes.value)
      };
      reference.push(spike);
      document.getElementById('ProposalForm').reset();
    } else {
      alert('description and title required');
    }
  }

  updateSpike(spike, prop, value) {
    spike[prop] = value;
    if ( prop === 'appr' && value === false) {
      spike['location'] = '';
    }
    firebase.database().ref(`spikes/${spike.key}`).update( spike );
  }

  deleteSpike(spike) {
    firebase.database().ref(`spikes/${spike.key}`).remove();
  }

  joinSpike(spike) {
    firebase.database().ref(`spikes/${spike.key}`).update( spike );
  }

  leaveSpike(spike) {
    const user = this.state.user;
    spike.attendees = spike.attendees.filter(attendee => attendee !== user.email);
    firebase.database().ref(`spikes/${spike.key}`).update( spike );
  }

  sanitizeInput(input) {
    return input.replace(/<script[^>]*?>.*?<\/script>/gi, '')
			.replace(/<[\/\!]*?[^<>]*?>/gi, '')
			.replace(/<style[^>]*?>.*?<\/style>/gi, '')
			.replace(/<![\s\S]*?--[ \t\n\r]*>/gi, '');
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
            user={this.state.user}
            speaker={this.state.speaker}
            gearUp={this.state.gearUp}
          />
        </section>
      )
    }

    if (user) {
      return (
        <section className="Application">
          <Header
            admins={admins}
            user={user}
            createSpike={(e) => this.createSpike(e)}
            showForm={this.state.showForm}
            toggleForm={() => this.toggleForm()}
          />
          <GuestSpeaker
            speaker={this.state.speaker}
          />
          <Spikes
            attending={this.state.attending}
            createSpike={(e) => this.createSpike(e)}
            spikes={this.state.spikes}
            user={user}
            updateCount={(spike) => this.updateCount(spike)}
          />
        </section>
      )
    }
  }
}
