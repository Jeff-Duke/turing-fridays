import React from 'react';
import firebase from '../firebase';
import { map } from 'lodash';

import AdminSpike from './AdminSpike';
import Spike from './Spike';

<<<<<<< HEAD
const Admin = ({ spikes, createSpike, updateSpike, deleteSpike, user, admins, showForm, toggleForm }) => {
=======
const Admin = ({ spikes, createSpike, updateSpike, deleteSpike }) => {
>>>>>>> master

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
      {!showForm && <button onClick={() => toggleForm()}>Add Spike</button>}
      {showForm && <Spike
        createSpike={createSpike}
<<<<<<< HEAD
        user={user}
        toggleForm={toggleForm}
      />}
      <div>
        {allAdmins}
      </div>
=======
      />
>>>>>>> master
      <h1>Spikes</h1>
      {allSpikes}
    </div>
  )
}

export default Admin;
