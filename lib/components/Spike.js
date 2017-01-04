import React from 'react';
import firebase from '../firebase';
import moment from 'moment';

const Spike = ({ spike, createSpike, updateCount, toggleForm }, key, admin ) => {
  if (spike) {
    return (
      <div className='SpikeCard' key={key}>
        <p>Title: <span>{spike.title}</span></p>
        <p>Description: <span>{spike.description}</span></p>
        <p>Date: <span>{moment(spike.createdAt).format('MM-DD-YYYY')}</span></p>
        <p>Location: <span>{spike.location}</span></p>
        <p>Led by: <span>{spike.createdBy}</span></p>
        <p>Attendees: <span>{spike.attendees ? spike.attendees.length : 0}</span></p>
        <button className='JoinButton' onClick={() => updateCount(spike)}>Join</button>
      </div>
    )
  } else {
    return (
      <div className='modal'>
        <h1 className='FormTitle'>Submit Spike</h1>
        <div id='SpikeForm'>
          <form
            id='ProposalForm'
            name='create-spike'
            onSubmit={(e)=> {
              createSpike(e)
              toggleForm()
            }}
          >
            <input
              placeholder='Topic Title'
              name='title'
            />
            <textarea
              placeholder='Description'
              name='description'
            />
            <div className="ButtonContainer">
              <input
                className='SubmitButton'
                type='submit'
              />
              <input
                value='Cancel'
                className='CancelButton'
                onClick={(e) => {
                  e.preventDefault();
                  toggleForm(e)
                }}
              />
            </div>  
          </form>
        </div>
      </div>
    )
  }
}

export default Spike
