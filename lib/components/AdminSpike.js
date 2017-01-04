import React from 'react';
import firebase from '../firebase';
import moment from 'moment';
import uuid from 'uuid';

const AdminSpike = ({ spike, createSpike, updateSpike, deleteSpike }, key ) => {
  return (
    <div className="spike-card" key={key}>
      <h1>{spike.title}</h1>
      <h2>{spike.description}</h2>
      <p>{spike.createdBy}</p>
      <p>Attendees: </p>
      <ul>
        {spike.attendees ?
          spike.attendees.map((attendee, index) => {
            return <li key={index}>{attendee}</li>
          })
          : <p>No Attendees</p>
        }
      </ul>
      <h3>{moment(spike.created_at).format("MM-DD-YYYY")}</h3>
        <input
          type='radio'
          name='location'
          value='GBank'
          onClick={(e)=>updateSpike(spike, 'location', e.target.value)}
        /> GBank
        <input
          type='radio'
          name='location'
          value='Gusto'
          onClick={(e)=>updateSpike(spike, 'location', e.target.value)}
        /> Gusto
        <input
          type='radio'
          name='location'
          value='Blake'
          onClick={(e)=>updateSpike(spike, 'location', e.target.value)}
        /> Blake
      <button onClick={()=>updateSpike(spike, 'appr', true)}>Approve</button>
      <button onClick={()=>deleteSpike(spike)}>Delete</button>
    </div>
  )
}

export default AdminSpike;
