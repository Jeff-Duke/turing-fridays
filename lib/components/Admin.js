import React, { Component } from 'react';
import { map, uniq } from 'lodash';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import AdminList from './AdminList';
import AdminSpike from './AdminSpike';
import FloorMap from './FloorMap';
import Spike from './Spike';
import GearUp from './GearUp';
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
      gearUpForm: false,
      spikes: null
    };
  }

  componentDidMount() {
    this.setDatesAndSpikes(this.props.spikes);
  }

  componentWillReceiveProps(nextProps) {
    this.setDatesAndSpikes(nextProps.spikes);
  }

  setDatesAndSpikes(spikes) {
    if (spikes.length) {
      let dateOptions = this.dateOptions(spikes)
      this.setState({ dateFilter: dateOptions[0].props.value, spikes })
    }
  }

  dateOptions(spikes) {
    let dates = uniq(map(spikes, (spike) => spike.spikeDate)).sort((a,b) => a > b);
    return map(dates, (date, index) => {
      return <option key={index} value={date}>{moment(date).format('MM-DD-YYYY')}</option>
    })
  }

  assignRooms(spikes, dateFilter) {
    if (!dateFilter) {return;}
    let classRooms = { a: '', b: '', c: '', d: '', e: '', f: '', g: '', h: '', auditorium: '', vault: '' };
    spikes.forEach((spike) => {
      if(spike.appr && spike.location) {
        if(moment(spike.spikeDate).format('MM-DD-YYYY') === moment(dateFilter).format('MM-DD-YYYY')) {
          if (spike.location === 'Classroom A') {classRooms.a = {title:spike.title, attendees: spike.attendees ? spike.attendees.length: 0 };}
          if (spike.location === 'Classroom B') {classRooms.b = {title:spike.title, attendees: spike.attendees ? spike.attendees.length: 0 };}
          if (spike.location === 'Classroom C') {classRooms.c = {title:spike.title, attendees: spike.attendees ? spike.attendees.length: 0 };}
          if (spike.location === 'Classroom D') {classRooms.d = {title:spike.title, attendees: spike.attendees ? spike.attendees.length: 0 };}
          if (spike.location === 'Classroom E') {classRooms.e = {title:spike.title, attendees: spike.attendees ? spike.attendees.length: 0 };}
          if (spike.location === 'Classroom F') {classRooms.f = {title:spike.title, attendees: spike.attendees ? spike.attendees.length: 0 };}
          if (spike.location === 'Classroom G') {classRooms.g = {title:spike.title, attendees: spike.attendees ? spike.attendees.length: 0 };}
          if (spike.location === 'Classroom H') {classRooms.h = {title:spike.title, attendees: spike.attendees ? spike.attendees.length: 0 };}
          if (spike.location === 'Grand Room') {classRooms.auditorium = {title:spike.title, attendees: spike.attendees ? spike.attendees.length: 0 };}
          if (spike.location === 'Vault Study') {classRooms.vault = {title:spike.title, attendees: spike.attendees ? spike.attendees.length: 0 };}
        }
      }
    });
    return classRooms;
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
    	updateSpike,
    	user,
      assignRooms,
      sanitizeInput
    } = this.props;
    const { spikes } = this.state;

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

    let roomAssignments = this.assignRooms(spikes, this.state.dateFilter)

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
            className='AdminShowMapButton ShowMapButton'
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
          {this.state.speakerForm && <GuestSpeakerForm hideForm={()=>this.setState({ speakerForm: false })} sanitizeInput={sanitizeInput} speaker={this.props.speaker} hideForm={()=>this.setState({ speakerForm: false })}/>}
        </ReactCSSTransitionGroup>
        <ReactCSSTransitionGroup
          transitionName='AnimateForm'
          transitionEnterTimeout={700}
          transitionLeaveTimeout={700}
        >
          {this.state.gearUpForm && <GearUpForm hideForm={()=>this.setState({ gearUpForm: false })} sanitizeInput={sanitizeInput} gearUp={this.props.gearUp} hideGearUpForm={()=>this.setState({ gearUpForm: false })}/>}
        </ReactCSSTransitionGroup>
        <section className='SortSpikes'>
          <p className='SortOptions'>Sort Spikes by:  </p>
          <article className='SortOptionsButtons'>
            <label htmlFor='SpikeStatusSort' aria-label='Sort spikes by status'>
              <select
                id='SpikeStatusSort'
                name='all'
                onChange={(e)=>this.setState({ filter: e.target.value })}
              >
                <option value='all'>All</option>
                <option value='true'>Approved</option>
                <option value='false'>Pending</option>
              </select>
            </label>
            <label htmlFor='AdminSortByDate' aria-label='Sort spikes by date'>
              <select
                id='AdminSortByDate'
                name='all'
                value={this.state.dateFilter}
                onChange={(e) => {
                  if (e.target.value === 'all') this.setState({ dateFilter: e.target.value })
                  else this.setState({ dateFilter: parseInt(e.target.value) })
                }}>
                {allDateOptions}
              </select>
            </label>
          </article>
        </section>
        <ReactCSSTransitionGroup
          transitionName='AnimateList'
          transitionEnterTimeout={700}
          transitionLeaveTimeout={700}
        >
          {this.state.adminList && adminList}
        </ReactCSSTransitionGroup>
        <GuestSpeaker
          speaker={this.props.speaker}
          admins={this.props.admins}
          user={this.props.user}
        />
        <GearUp gearUp={this.props.gearUp}/>
        <h1 className='SpikesTitle'>Spikes</h1>
        <section className='AllSpikes AllAdminSpikes'>
          {allSpikes}
        </section>
      </section>
    )
  }
}
