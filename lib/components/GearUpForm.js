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
      this.setState({ [name]: this.props.sanitizeInput(value) });
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
      <section className='Modal'>
        <section>
          <form id='GearUpForm' onSubmit={(e)=>{
            this.createGearUp(e)
            this.props.hideForm();
          }}>
            <h1 className='FormTitle GearUpTitle'>Submit a Gear Up</h1>
            <label htmlFor='GearUpTitle' aria-label='Gear up title' title='Gear Up Title'>
              <input
                name='title'
                onChange={(e)=>this.setGearUpInfo(e)}
                placeholder='Gear Up Title'
                id='GearUpTitle'
              />
            </label>
            <label htmlFor='GearUpDescription' aria-label='Gear up Description' title='Gear Up Description'>
              <textarea
                name='description'
                onChange={(e)=>this.setGearUpInfo(e)}
                placeholder='Description'
                id='GearUpDescription'
              />
            </label>
            <label htmlFor='GearUpLink' aria-label='Gear up link' title='Gear Up Link'>
              <input
                name='link'
                onChange={(e)=>this.setGearUpInfo(e)}
                placeholder='Link'
                id='GearUpLink'
              />
            </label>
            <section className='ButtonContainer'>
              <button className='SubmitButton' type='submit'>Submit</button>
              <button className='CancelButton' onClick={(e) => {
                e.preventDefault();
                this.props.hideGearUpForm(e)
              }}
              >Cancel</button>
            </section>
          </form>
        </section>
      </section>
    )
  }
}
