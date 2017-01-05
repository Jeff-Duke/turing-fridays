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

  render() {
    const { spikes, updateSpike, deleteSpike, admins,
      newAdmin, removeAdmin } = this.props;

    let allSpikes = map(spikes, (spike) => {
      if (spike.appr.toString() === this.state.filter || this.state.filter === 'all') {
        return (
          <AdminSpike
            spike={spike}
            key={spike.key}
            updateSpike={updateSpike}
            deleteSpike={deleteSpike}
          />
        )
      }
    });

    let allAdmins = map(admins, (admin, index) => {
      return (
        <p key={index}>{admin}
          <button className="DeleteAdminButton" onClick={()=>removeAdmin(admin)}>X</button>
        </p>
      )
    })

    return (
      <section className="Admin">
        <select name="all" onChange={(e)=>this.setState({ filter: e.target.value })}>
          <option value="all">All</option>
          <option value="true">Approved</option>
          <option value="false">Unapproved</option>
        </select>
        <section className="AdminList">
          {allAdmins}
          <form onSubmit={(e) => newAdmin(e)}>
            <input id="newAdmin" name='email' placeholder='email@email.com'/>
            <input className="AdminSubmitButton" type="submit"/>
          </form>
        </section>
        <h1 className="SpikesTitle">Spikes</h1>
        <section className="AllSpikes AllAdminSpikes">
          {allSpikes}
        </section>
      </section>
    )
  }
}
