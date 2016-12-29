import React from 'react';
import firebase from '../firebase';
import { map } from 'lodash'

import Spike from './Spike';

const Spikes = ({ spikes, createSpike }) => {
  let allSpikes = map(spikes, (spike) => {
    if(spike.appr === true) {
      return <Spike spike={spike} key={spike.key} />
    }
  })
  return (
    <div>
      <Spike createSpike={createSpike} />
      <h1>Spikes</h1>
      {allSpikes}
    </div>
  )
}

export default Spikes
