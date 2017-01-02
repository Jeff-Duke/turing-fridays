import React from 'react';
import firebase from '../firebase';
import moment from 'moment';

const Spike = ({ spike, createSpike, updateCount, user }, key, admin ) => {
  if (spike) {
    return (
      <div className="SpikeCard" key={key}>
        <p>Title: <span>{spike.title}</span></p>
        <p>Description: <span>{spike.description}</span></p>
        <p>Date: <span>{moment(spike.createdAt).format("MM-DD-YYYY")}</span></p>
        <p>Location: <span>{spike.location}</span></p>
        <p>Led by: <span>{spike.createdBy}</span></p>
        <p>Attendees: <span>{spike.attendees ? spike.attendees.length : 0}</span></p>
        <button className="VoteButton" onClick={()=>updateCount(spike, user)}>Vote</button>
      </div>
    )
  } else {
    return (
      <form
        id='proposalForm'
        name='create-spike'
        onSubmit={ (e)=>createSpike(e, user) }
      >
        <input
          placeholder='title'
          name='title'
        />
        <textarea
          placeholder='description'
          name='description'
        />
        <input
          className="SubmitButton"
          type='submit'
        />
      </form>
    )
  }
}

export default Spike
