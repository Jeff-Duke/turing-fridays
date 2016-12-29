import React from 'react';
import firebase from '../firebase';
import moment from 'moment';

const AdminSpike = ({ spike, createSpike, approveSpike }, key ) => {
  return (
    <div className="spike-card" key={key}>
      <h1>{spike.title}</h1>
      <h2>{spike.description}</h2>
      <h3>{moment(spike.created_at).format("MM-DD-YYYY")}</h3>
      <button onClick={()=>approveSpike(spike.key)}>Approve</button>
    </div>
  )
}

export default AdminSpike
