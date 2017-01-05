import React, { Component } from 'react';
import firebase from '../firebase';
import { map, uniq } from 'lodash';
import AdminSpike from './AdminSpike';
import Spike from './Spike';

export default class Admin extends Component {
  constructor(props) {
    super();
    this.state = {
      filter: 'all',
      dateFilter: 'all'
    };
  }

  filterSpikes(spikes) {
    return map(spikes, (spike) => {
      if (this.state.filter === 'all' || this.state.filter === spike.appr.toString()) {
        if (this.state.dateFilter === 'all' || this.state.dateFilter === spike.spikeDate) {
          return (
            <AdminSpike
              spike={spike}
              key={spike.key}
              updateSpike={this.props.updateSpike}
              deleteSpike={this.props.deleteSpike}
            />)
          }
        }
    })
  }

  dateOptions(spikes) {
    let dates = uniq(map(spikes, (spike) => spike.spikeDate)).sort((a,b) => {
      a = a.split('-').join('');
      b = b.split('-').join('');
      return a > b ? 1 : a < b ? -1 : 0;
    })
    return map(dates, (date, index) => {
      return <option key={index} value={date}>{date}</option>
    })
  }

  render() {
    const { spikes, updateSpike, deleteSpike, admins,
      newAdmin, removeAdmin } = this.props;

    let allSpikes = this.filterSpikes(spikes)

    let allDateOptions = this.dateOptions(spikes)

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
          <option value="false">Pending</option>
        </select>
        <select name="all" onChange={(e)=>this.setState({ dateFilter: e.target.value })}>
          <option value="all">All Dates</option>
          {allDateOptions}
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
