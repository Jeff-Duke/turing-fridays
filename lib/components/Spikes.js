import React from 'react';
import firebase from '../firebase';
import { map } from 'lodash';

import Spike from './Spike';

const Spikes = ({ spikes, createSpike, updateCount, user, showForm, toggleForm }) => {
  let allSpikes = map(spikes, (spike) => {
    if(spike.appr === true) {
      return (
        <Spike
          spike={spike}
          key={spike.key}
          updateCount={updateCount}
          user={user}
        />
      )
    }
  })
  return (
    <div>
      {!showForm && <button onClick={() => toggleForm()}>Add Spike</button>}
      {showForm && <Spike
        createSpike={createSpike}
        user={user}
        toggleForm={toggleForm}
      />}
      <h1 className="SpikesTitle">Student-Led Spikes</h1>
      <div className="AllSpikes">{allSpikes}</div>
    </div>
  )
}

export default Spikes
