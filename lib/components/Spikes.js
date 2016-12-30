import React from 'react';
import firebase from '../firebase';
import { map } from 'lodash';

import Spike from './Spike';

const Spikes = ({ spikes, createSpike, updateCount, user }) => {
  let allSpikes = map(spikes, (spike) => {
    if(spike.appr === true) {
<<<<<<< HEAD
      return <Spike spike={spike} key={spike.key} updateCount={updateCount} user={user}/>
=======
      return (
        <Spike
          spike={spike}
          key={spike.key}
          updateCount={updateCount}
        />
      )
>>>>>>> master
    }
  })
  return (
    <div>
      <Spike createSpike={createSpike} user={user} />
      <h1>Spikes</h1>
      {allSpikes}
    </div>
  )
}

export default Spikes
