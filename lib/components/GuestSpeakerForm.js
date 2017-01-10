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
      <section className='Modal'>
        <section id='SpeakerForm'>
          <form onSubmit={(e)=>this.createSpeaker(e)}>
            <h1 className='FormTitle SpeakerFormTitle'>Submit a Guest Speaker</h1>
            <input
              name='name'
              onChange={(e)=>this.setSpeakerInfo(e)}
              placeholder='Name'
            />
            <textarea
              name='description'
              onChange={(e)=>this.setSpeakerInfo(e)}
              placeholder='Description'
            />
            <input
              name='link'
              onChange={(e)=>this.setSpeakerInfo(e)}
              placeholder='Link'
            />
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
