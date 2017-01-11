import React, { Component } from 'react';
import { map, uniq } from 'lodash';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AdminList from './AdminList';
import AdminSpike from './AdminSpike';
import FloorMap from './FloorMap';
import Spike from './Spike';
import GuestSpeaker from './GuestSpeaker';
import GuestSpeakerForm from './GuestSpeakerForm';
import GearUpForm from './GearUpForm';

export default class Admin extends Component {
  constructor(props) {
    super();
    this.state = {
      adminList: false,
      dateFilter: '',
      filter: 'all',
      floorMap: false,
      speakerForm: false,
      gearUpForm: false
    };
  }

  componentWillReceiveProps() {
    const { spikes } = this.props;
    if (spikes.length) {
      let dateOptions = this.dateOptions(this.props.spikes);
      this.setState({ dateFilter: dateOptions[0].props.value});
    }
  }

  dateOptions(spikes) {
    let dates = uniq(map(spikes, (spike) => spike.spikeDate)).sort((a,b) => a > b);
    return map(dates, (date, index) => {
      return <option key={index} value={date}>{moment(date).format('MM-DD-YYYY')}</option>
    })
  }

  filterSpikes(spikes) {
    let { dateFilter } = this.state
    return map(spikes, (spike) => {
      if (this.state.filter === 'all' || this.state.filter === spike.appr.toString()) {
        if (moment(spike.spikeDate).format('MM-DD-YYYY') === moment(dateFilter).format('MM-DD-YYYY')) {
          return (
            <AdminSpike
              spike={spike}
              key={spike.key}
              updateSpike={this.props.updateSpike}
              deleteSpike={this.props.deleteSpike}
              attending={this.props.attending}
              admins={this.props.admins}
              user={this.props.user}
            />)
          }
        }
    })
  }

  render() {
    const {
    	admins,
    	deleteSpike,
    	newAdmin,
    	removeAdmin,
    	spikes,
    	updateSpike,
    	user,
      assignRooms
    } = this.props;


    let allSpikes = this.filterSpikes(spikes)

    let allDateOptions = this.dateOptions(spikes)

    let allAdmins = map(admins, (admin, index) => {
      return (
        <p className='AdminEmail' key={index}>
          {admin}
          <button
            className='DeleteAdminButton'
            hidden={user.email !== 'peterspringer829@gmail.com'}
            onClick={()=>removeAdmin(admin)}>
            X
          </button>
        </p>
      )
    })

    let adminList =
      <AdminList
        user={user}
        toggleList={()=>this.setState({ adminList: !adminList })}
        allAdmins={allAdmins}
        newAdmin={newAdmin}
      />

    let roomAssignments = assignRooms(spikes, this.state.dateFilter)

    return (
      <section className='Admin'>
        <section className='AdminButtons'>
          <button
            className='OpenAdminsListButton'
            onClick={() => this.setState({ adminList: true })}
          >
            Admins List
          </button>
          <button
            className='ShowMapButton'
            onClick={() => this.setState({ floorMap: true })}
          >
            Show Map
          </button>
          <button
            className='AddSpeakerButton'
            onClick={() => this.setState({ speakerForm: true })}
          >
            Add Guest Speaker
          </button>
          <button
            className='AddGearUpButton'
            onClick={() => this.setState({ gearUpForm: true })}
          >
            Add Gear Up
          </button>
        </section>
        <ReactCSSTransitionGroup
          transitionName='AnimateForm'
          transitionEnterTimeout={700}
          transitionLeaveTimeout={700}
        >
          {this.state.floorMap && <FloorMap rooms={roomAssignments} hideMap={()=>this.setState({ floorMap: false })}/>}
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName='AnimateForm'
          transitionEnterTimeout={700}
          transitionLeaveTimeout={700}
        >
          {this.state.speakerForm && <GuestSpeakerForm speaker={this.props.speaker} hideForm={()=>this.setState({ speakerForm: false })}/>}
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName='AnimateForm'
          transitionEnterTimeout={700}
          transitionLeaveTimeout={700}
        >
          {this.state.gearUpForm && <GearUpForm gearUp={this.props.gearUp} hideGearUpForm={()=>this.setState({ gearUpForm: false })}/>}
        </ReactCSSTransitionGroup>
        <section className='SortSpikes'>
          <p className='SortOptions'>Sort Spikes by:
            <label htmlFor='SpikeStatusSort' aria-label='Sort spikes by status'>
              <select id='SpikeStatusSort' name='all' onChange={(e)=>this.setState({ filter: e.target.value })}>
                <option value='all'>All</option>
                <option value='true'>Approved</option>
                <option value='false'>Pending</option>
              </select>
            </label>
            <label htmlFor='AdminSortByDate' aria-label='Sort spikes by date'>
              <select id='AdminSortByDate' name='all'
                value={this.state.dateFilter}
                onChange={(e) => {
                  if (e.target.value === 'all') this.setState({ dateFilter: e.target.value })
                  else this.setState({ dateFilter: parseInt(e.target.value) })
                }}>
                {allDateOptions}
              </select>
            </label>
          </p>
        </section>
        <ReactCSSTransitionGroup
          transitionName='AnimateList'
          transitionEnterTimeout={700}
          transitionLeaveTimeout={700}
        >
          {this.state.adminList && adminList}
        </ReactCSSTransitionGroup>
        <GuestSpeaker speaker={this.props.speaker}/>
        <h1 className='SpikesTitle'>Spikes</h1>
        <section className='AllSpikes AllAdminSpikes'>
          {allSpikes}
        </section>
      </section>
    )
  }
}
