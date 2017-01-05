import React, { Component } from 'react';
import firebase from '../firebase';
import { map } from 'lodash';

import AdminSpike from './AdminSpike';
import Spike from './Spike';


export default class Admin extends Component {
  constructor(props) {
    super();
    this.state = {
      filter: 'all',
    };
  }

  filterByAppr(spikes) {
    return map(spikes, (spike) => {
      if (spike.appr.toString() === this.state.filter || this.state.filter === 'all') {
        return (
          <AdminSpike
            spike={spike}
            key={spike.key}
            updateSpike={this.props.updateSpike}
            deleteSpike={this.props.deleteSpike}
          />
      )}
    })
  }

  render() {
    const { spikes, createSpike, updateSpike, deleteSpike, admins,
      showForm, toggleForm, newAdmin, removeAdmin } = this.props;

    let allSpikes = this.filterByAppr(spikes)

    let allAdmins = map(admins, (admin, index) => {
      return (
        <p key={index}>{admin}
          <button className="DeleteAdminButton" onClick={()=>removeAdmin(admin)}>X</button>
        </p>
      )
    })

    return (
      <div className="Admin">
        {!showForm && <button className="AddSpikeButton" onClick={() => toggleForm()}>Add Spike</button>}
        {showForm && <Spike
          createSpike={createSpike}
          toggleForm={toggleForm}
        />}
        <select name="all" onChange={(e)=>this.setState({ filter: e.target.value })}>
          <option value="all">All</option>
          <option value="true">Approved</option>
          <option value="false">Unapproved</option>
        </select>
        <div>
          {allAdmins}
          <form onSubmit={(e) => newAdmin(e)}>
            <input id="newAdmin" name='email' placeholder='email@email.com'/>
            <input className="AdminSubmitButton" type="submit"/>
          </form>
        </div>
        <h1 className="SpikesTitle">Spikes</h1>
        <div className="AllSpikes AllAdminSpikes">
          {allSpikes}
        </div>
      </div>
    )
  }
}
