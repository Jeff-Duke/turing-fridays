import React from 'react';
import firebase from '../firebase';
import { map } from 'lodash';

import AdminSpike from './AdminSpike';
import Spike from './Spike';

const Admin = ({ spikes, createSpike, approveSpike }) => {

  let allSpikes = map(spikes, (spike) => {
    return <AdminSpike spike={spike} key={spike.key} approveSpike={approveSpike}/>
  })

  console.log('admin')

  return (
    <div>
      <Spike createSpike={createSpike}/>
      <h1>Spikes</h1>
      {allSpikes}
    </div>
  )
}

export default Admin
