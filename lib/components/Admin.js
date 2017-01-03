import React from 'react';
import firebase from '../firebase';
import { map } from 'lodash';

import AdminSpike from './AdminSpike';
import Spike from './Spike';

const Admin = ({ spikes, createSpike, updateSpike, deleteSpike, user, admins }) => {

  let allSpikes = map(spikes, (spike) => {
    return (
      <AdminSpike
        spike={spike}
        key={spike.key}
        updateSpike={updateSpike}
        deleteSpike={deleteSpike}
      />
    )
  });

  let allAdmins = map(admins, (admin) => {
    return <p key={admin}>{admin}</p>
  })

  return (
    <div className="Admin">
      <Spike
        createSpike={createSpike}
        user={user}
      />
      <div>
        {allAdmins}
      </div>
      <h1>Spikes</h1>
      {allSpikes}
    </div>
  )
}

export default Admin;
