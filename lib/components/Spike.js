import React from 'react';
import firebase from '../firebase';
import moment from 'moment';

const Spike = ({ spike, createSpike }, key ) => {
  if (spike) {
    return (
      <div key={key}>
        <h1>{spike.title}</h1>
        <h2>{spike.description}</h2>
        <h3>{moment(spike.created_at).format("MM-DD-YYYY")}</h3>
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
