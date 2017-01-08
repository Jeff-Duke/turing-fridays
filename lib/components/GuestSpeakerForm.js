import React, { Component } from 'react';
import firebase, { speakerReference } from '../firebase';

export default class GuestSpeakerForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      link: ''
    };
  }

    setSpeakerInfo(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    createSpeaker(e) {
      e.preventDefault();
      const speaker = {
        name: this.state.name,
        description: this.state.description,
        link: this.state.link
      };
      speakerReference.push(speaker);
      document.getElementById('SpeakerForm').reset();
    }

  render() {
    return(
      <form id='SpeakerForm' onSubmit={(e)=>this.createSpeaker(e)}>
        <h2>Submit a Guest Speaker</h2>
        <input
          name='name'
          onChange={(e)=>this.setSpeakerInfo(e)}
          placeholder='name'
        />
        <input
          name='description'
          onChange={(e)=>this.setSpeakerInfo(e)}
          placeholder='description'
        />
        <input
          name='link'
          onChange={(e)=>this.setSpeakerInfo(e)}
          placeholder='link'
        />
        <button type='submit'>Submit</button>
      </form>
    )
  }
}
