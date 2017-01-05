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
      dateFilter: 'all'
    };
  }

  openAdminsList(e) {
    e.preventDefault();
    document.querySelector('.AdminsList').style.display = 'block';
    document.querySelector('.AdminsList').style.width = '300px';
    document.body.style.marginLeft = '300px';
  }

  closeAdminsList(e) {
    e.preventDefault();
    document.querySelector('.AdminsList').style.display = 'none';
    document.querySelector('.AdminsList').style.width = '0';
    document.body.style.marginLeft = '0';
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

  render() {
    const { spikes, updateSpike, deleteSpike, admins,
      newAdmin, removeAdmin, dateOptions } = this.props;

    let allSpikes = this.filterSpikes(spikes)

    let allDateOptions = dateOptions(spikes)

    let allAdmins = map(admins, (admin, index) => {
      return (
        <p className='AdminEmail' key={index}>{admin}
          <button className='DeleteAdminButton' onClick={()=>removeAdmin(admin)}>X</button>
        </p>
      )
    })

    return (
      <section className='Admin'>
        <button className='OpenAdminsListButton' onClick={(e) => this.openAdminsList(e)}>Admins List</button>
        <section className='SortSpikes'>
          <p>Sort Spikes by:</p>
          <select name='all' onChange={(e)=>this.setState({ filter: e.target.value })}>
            <option value='all'>All</option>
            <option value='true'>Approved</option>
            <option value='false'>Pending</option>
          </select>
          <select name='all' onChange={(e)=>this.setState({ dateFilter: e.target.value })}>
            <option value='all'>All Dates</option>
            {allDateOptions}
          </select>
        </section>  
        <section className='AdminsList'>
          <button className='CloseListButton' onClick={(e) => this.closeAdminsList(e)}>Close</button>
          <section className='AdminEmails'>{allAdmins}</section>
          <form className='AddAdminForm' onSubmit={(e) => newAdmin(e)}>
            <input id='newAdmin' name='email' placeholder='name@email.com'/>
            <input className='AdminSubmitButton' type='submit'/>
          </form>
        </section>
        <h1 className='SpikesTitle'>Spikes</h1>
        <section className='AllSpikes AllAdminSpikes'>
          {allSpikes}
        </section>
      </section>
    )
  }
}
