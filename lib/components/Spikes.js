import React from 'react';
import firebase from '../firebase';
import { map } from 'lodash';
import Spike from './Spike';

const Spikes = ({ spikes, updateCount, user }) => {
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
    <section>
      <h1 className="SpikesTitle">Student-Led Spikes</h1>
      <section className="AllSpikes">{allSpikes}</section>
    </section>
  )
}

export default Spikes;
