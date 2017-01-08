import React, { Component } from 'react';

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

  render() {
    return(
      <form>
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
        <input type='submit'/>
      </form>
    )
  }
}
