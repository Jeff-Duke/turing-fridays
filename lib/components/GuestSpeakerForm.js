import React, { Component } from 'react';
import firebase, { speakerReference } from '../firebase';
import GuestSpeaker from './GuestSpeaker';

export default class GuestSpeakerForm extends Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      description: '',
      link: ''
    };
  }

  setSpeakerInfo(e) {
    const { name, value } = e.target;
    this.setState({ [name]: this.props.sanitizeInput(value) });
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
    this.props.hideForm();
  }

  render() {
    return(
      <section className='Modal'>
        <section>
          <form id='SpeakerForm' onSubmit={(e)=>{
            this.createSpeaker(e)
            this.props.hideForm();
          }}>
            <h1 className='FormTitle SpeakerFormTitle'>Submit a Guest Speaker</h1>
            <label htmlFor='GuestSpeakerName' aria-label='Guest speaker name' title='Guest speaker name'>
              <input
                name='name'
                onChange={(e)=>this.setSpeakerInfo(e)}
                placeholder='Name'
                id='GuestSpeakerName'
              />
            </label>
            <label htmlFor='GuestSpeakerDescription' aria-label='Guest speaker description' title='Guest speaker Description'>
              <textarea
                name='description'
                onChange={(e)=>this.setSpeakerInfo(e)}
                placeholder='Description'
                id='GuestSpeakerDescription'
              />
            </label>
            <label htmlFor='GuestSpeakerLink' aria-label='Guest speaker link' title='Guest speaker Link'>
              <input
                name='link'
                onChange={(e)=>this.setSpeakerInfo(e)}
                placeholder='Link'
                id='GuestSpeakerLink'
              />
            </label>
            <section className='ButtonContainer'>
              <button className='SubmitButton' type='submit'>Submit</button>
              <button className='CancelButton' onClick={(e) => {
                e.preventDefault();
                this.props.hideForm(e)
              }}
              >Cancel</button>
            </section>
          </form>
        </section>
      </section>
    )
  }
}
