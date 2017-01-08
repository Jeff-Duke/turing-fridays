import React, { Component } from 'react';

export default class GuestSpeakerForm extends Component {
  constructor() {
    super()
  }
  render() {
    return(
      <form>
        <h2>Submit a Guest Speaker</h2>
        <input placeholder='name'/>
        <input placeholder='description'/>
        <input placeholder='link'/>
        <input type='submit'/>
      </form>
    )
  }
}
