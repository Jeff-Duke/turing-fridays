import React from 'react';
import firebase from '../firebase';
import { map } from 'lodash';

import AdminSpike from './AdminSpike';
import Spike from './Spike';

const Admin = ({ spikes, createSpike, updateSpike, deleteSpike,
                  admins, showForm, toggleForm, newAdmin, removeAdmin }) => {

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

  let allAdmins = map(admins, (admin, index) => {
    return <p key={index}>{admin}<button onClick={()=>removeAdmin(admin)}>X</button></p>
  })

  return (
    <div className="Admin">
      {!showForm && <button onClick={() => toggleForm()}>Add Spike</button>}
      {showForm && <Spike
        createSpike={createSpike}
        toggleForm={toggleForm}
      />}
      <div>
        {allAdmins}
        <form onSubmit={(e) => newAdmin(e)}>
          <input id="newAdmin" name='email' placeholder='email@email.com'/>
          <input type="submit"/>
        </form>
      </div>
      <h1>Spikes</h1>
      {allSpikes}
    </div>
  )
}

export default Admin;
