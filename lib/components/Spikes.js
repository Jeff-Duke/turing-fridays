import React from 'react';
import firebase from '../firebase';
import { map } from 'lodash'

import Spike from './Spike';

const Spikes = ({ spikes, createSpike }) => {
  let allSpikes = map(spikes, (spike) => {
    return <Spike spike={spike} key={spike.key}/>
  })
  return (
    <div>
      <h1>Spikes</h1>
      {allSpikes}
      <Spike createSpike={createSpike}/>
    </div>
  )
}

export default Spikes
