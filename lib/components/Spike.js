import React from 'react';
import firebase from '../firebase';
import moment from 'moment';

const Spike = ({ spike, createSpike, updateCount, toggleForm, user, attending }, key, admin ) => {
  if (spike) {
    return (
      <section className='SpikeCard' key={key}>
        <p>Title: <span>{spike.title}</span></p>
        <p>Description: <span>{spike.description}</span></p>
        <p>
        Spike Session Date:
          <span>  {moment(spike.spikeDate).format('MM-DD-YYYY')}</span>
        </p>
        <p>Location: <span>{spike.location}</span></p>
        <p>Spike Hosts: <span>{spike.hosts}</span></p>
        <p>Attendees: <span>{spike.attendees ? spike.attendees.length : 0}</span></p>
        <button
          id='join'
          className='JoinButton'
          onClick={() => {
            updateCount(spike);
          }}>
          {attending && spike.key === attending.key ? 'Leave' : 'Join'}
        </button>
      </section>
    )
  } else {
    return (
      <section className='Modal'>
        <section id='SpikeForm'>
          <h1 className='FormTitle'>Submit Spike</h1>
          <form
            id='ProposalForm'
            name='create-spike'
            onSubmit={(e)=> {
              createSpike(e)
              toggleForm()
            }}
          >
            <input placeholder='Spike Title' name='title' />
            <input placeholder='Spike Hosts' name='hosts' />
            <textarea placeholder='Description' name='description' />
            <textarea placeholder='Notes for Staff' name='notes' />
            <label className='SpikeDate' htmlFor='date-of-spike'>Date of Spike:
              <input className='SpikeDatePicker' type='date' name='spikeDate' min="2017-01-01" />
            </label>
            <section className="ButtonContainer">
              <button
                className='SubmitButton'
                type='submit'
              >Submit</button>
              <button
                className='CancelButton'
                onClick={(e) => {
                  e.preventDefault();
                  toggleForm(e)
                }}
              >Cancel</button>
            </section>
          </form>
        </section>
      </section>
    )
  }
}

export default Spike;
