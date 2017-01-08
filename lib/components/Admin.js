import React, { Component } from 'react';
import { map, uniq } from 'lodash';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import AdminSpike from './AdminSpike';
import Spike from './Spike';
import AdminList from './AdminList';
import FloorMap from './FloorMap';

export default class Admin extends Component {
  constructor(props) {
    super();
    this.state = {
      filter: 'all',
      dateFilter: 'all',
      adminList: false,
      floorMap: false,
    };
  }

  dateOptions(spikes) {
    let dates = uniq(map(spikes, (spike) => spike.spikeDate)).sort((a,b) => a > b);
    return map(dates, (date, index) => {
      return <option key={index} value={date}>{moment(date).format('MM-DD-YYYY')}</option>
    })
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

  assignRooms(spikes) {
    let classRooms = { a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '', auditorium: '', vault: '' }
    spikes.forEach((spike) => {
      if(spike.location) {
        if (spike.location === 'Classroom A') classRooms.a = spike.title;
        if (spike.location === 'Classroom B') classRooms.b = spike.title;
        if (spike.location === 'Classroom C') classRooms.c = spike.title;
        if (spike.location === 'Classroom D') classRooms.d = spike.title;
        if (spike.location === 'Classroom E') classRooms.e = spike.title;
        if (spike.location === 'Classroom F') classRooms.f = spike.title;
        if (spike.location === 'Classroom G') classRooms.g = spike.title;
        if (spike.location === 'Classroom H') classRooms.h = spike.title;
        if (spike.location === 'Grand Room') classRooms.auditorium = spike.title;
        if (spike.location === 'Vault Study') classRooms.vault = spike.title;
      }
    })
    return classRooms;
  }

  render() {
    const { spikes, updateSpike, deleteSpike, admins,
      newAdmin, removeAdmin, user } = this.props;

    let allSpikes = this.filterSpikes(spikes)

    let allDateOptions = this.dateOptions(spikes)

    let allAdmins = map(admins, (admin, index) => {
      return (
        <p className='AdminEmail' key={index}>{admin}
          <button
            className='DeleteAdminButton'
            hidden={user.email !== 'peterspringer829@gmail.com'}
            onClick={()=>removeAdmin(admin)}>
            X
          </button>
        </p>
      )
    })

    let adminList = <AdminList user={user} toggleList={()=>this.setState({ adminList: !adminList })} allAdmins={allAdmins} newAdmin={newAdmin}/>

    let roomAssignments = this.assignRooms(spikes)

    return (
      <section className='Admin'>
        {this.state.floorMap && <FloorMap rooms={roomAssignments} hideMap={()=>this.setState({ floorMap: false })}/>}
        <button
          className='OpenAdminsListButton'
          onClick={() => this.setState({ adminList: true })}
        >
          Admins List
        </button>
        <button
          onClick={() => this.setState({ floorMap: true })}
        >
          Show Map
        </button>
        <section className='SortSpikes'>
          <p>Sort Spikes by:</p>
          <select name='all' onChange={(e)=>this.setState({ filter: e.target.value })}>
            <option value='all'>All</option>
            <option value='true'>Approved</option>
            <option value='false'>Pending</option>
          </select>
          <select name='all' onChange={(e)=>{
            if (e.target.value === 'all') this.setState({ dateFilter: e.target.value })
            else this.setState({ dateFilter: parseInt(e.target.value) })
          }}>
            <option value='all'>All Dates</option>
            {allDateOptions}
          </select>
        </section>
        <ReactCSSTransitionGroup
          transitionName='AnimateList'
          transitionEnterTimeout={700}
          transitionLeaveTimeout={700}
        >
          {this.state.adminList && adminList}
        </ReactCSSTransitionGroup>
        <h1 className='SpikesTitle'>Spikes</h1>
        <section className='AllSpikes AllAdminSpikes'>
          {allSpikes}
        </section>
      </section>
    )
  }
}
