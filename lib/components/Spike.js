import React from 'react';
import firebase from '../firebase';
import moment from 'moment';

const Spike = ({ spike, createSpike, updateCount, toggleForm }, key, admin ) => {
  if (spike) {
    return (
      <div className="SpikeCard" key={key}>
        <p>Title: <span>{spike.title}</span></p>
        <p>Description: <span>{spike.description}</span></p>
        <p>Date: <span>{moment(spike.createdAt).format("MM-DD-YYYY")}</span></p>
        <p>Location: <span>{spike.location}</span></p>
        <p>Led by: <span>{spike.createdBy}</span></p>
        <p>Attendees: <span>{spike.attendees ? spike.attendees.length : 0}</span></p>
        <button className="JoinButton" onClick={() => updateCount(spike)}>Join</button>
      </div>
    )
  } else {
    return (
      <div id="SpikeForm">
        <h1 className="FormTitle">Submit Spike Session</h1>
        <form
          id='ProposalForm'
          name='create-spike'
          onSubmit={ (e)=>createSpike(e) }
        >
          <input
            placeholder='Topic Title'
            name='title'
          />
          <textarea
            placeholder='Description'
            name='description'
          />
          <input
            className="SubmitButton"
            type='submit'
            onClick={(e) => {
              e.preventDefault();
              toggleForm(e)
            }}
          />
        </form>
      </div>
    )
  }
}

export default Spike
