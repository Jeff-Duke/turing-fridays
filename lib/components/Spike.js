import React from 'react';
import firebase from '../firebase';

const Spike = ({ spike, createSpike }) => {
  if (spike) {
    return (
      <div>
        <h1>Spike</h1>
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
