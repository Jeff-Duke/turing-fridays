import React from 'react';
import firebase from '../firebase';

import Spike from './Spike';

const Spikes = ({ spikes, createSpike }) => {
  return (
    <div>
      <h1>Spikes</h1>
      <Spike createSpike={createSpike}/>
    </div>
  )
}

export default Spikes
