import React from 'react';
import firebase from '../firebase';
import moment from 'moment';

const Spike = ({ spike, createSpike }, key, admin ) => {
  if (spike) {
    return (
      <div className="spike-card" key={key}>
        <h1>{spike.title}</h1>
        <h2>{spike.description}</h2>
        <p>{moment(spike.createdAt).format("MM-DD-YYYY")}</p>
        <p>{spike.location}</p>
        <p>{spike.user}</p>
        
      </div>
    )
  } else {
    return (
      <form name='create-spike' onSubmit={(e)=>createSpike(e)}>
        <input placeholder='title' name='title'/>
        <input placeholder='description' name='description'/>
        <input type='submit'/>
      </form>
    )
  }
}

export default Spike
