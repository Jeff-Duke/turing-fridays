import React, { Component } from 'react';
import firebase, { speakerReference } from '../firebase';

export default class GuestSpeakerForm extends Component {
  constructor() {
    super();
    this.state = {
      speaker: '',
      description: '',
      link: ''
    };
  }

    setSpeakerInfo(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    createSpeaker(e) {
      debugger;
      e.preventDefault();
      const speaker = {
        speaker: this.state.speaker,
        description: this.state.description,
        link: this.state.link
      };
      speakerReference.push(speaker);
    }



  render() {
    return(
      <form onSubmit={(e)=>this.createSpeaker(e)}>
        <h2>Submit a Guest Speaker</h2>
        <input
          name='speaker'
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
