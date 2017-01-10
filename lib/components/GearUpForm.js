import React, { Component } from 'react';
import firebase, { gearUpReference } from '../firebase';
import GearUp from './GearUp';

export default class GearUpForm extends Component {
  constructor(props) {
    super();
    this.state = {
      title: '',
      description: '',
      link: ''
    };
  }

    setGearUpInfo(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    createGearUp(e) {
      e.preventDefault();
      const gearUp = {
        title: this.state.title,
        description: this.state.description,
        link: this.state.link
      };
      gearUpReference.push(gearUp);
      document.getElementById('GearUpForm').reset();
    }

  render() {
    return(
      <div>
        <form id='GearUpForm' onSubmit={(e)=>this.createGearUp(e)}>
          <h2>Submit a Gear Up</h2>
          <input
            name='title'
            onChange={(e)=>this.setGearUpInfo(e)}
            placeholder='title'
          />
          <input
            name='description'
            onChange={(e)=>this.setGearUpInfo(e)}
            placeholder='description'
          />
          <input
            name='link'
            onChange={(e)=>this.setGearUpInfo(e)}
            placeholder='link'
          />
          <button type='submit'>Submit</button>
        </form>
        <GearUp gearUp={this.props.gearUp}/>
      </div>
    )
  }
}
