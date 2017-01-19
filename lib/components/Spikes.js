import React , { Component } from 'react';
import firebase from '../firebase';
import { map, uniq } from 'lodash';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import FloorMap from './FloorMap';
import Spike from './Spike';
import AdminSpike from './AdminSpike';

export default class Spikes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFilter: '',
      floorMap: false,
      spikes: null
    };
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

  filterSpikes(spikes) {
    const { updateCount, user } = this.props;
    const { dateFilter } = this.state;
    return map(spikes, (spike) => {
      if(spike.appr) {
        if(moment(spike.spikeDate).format('MM-DD-YYYY') === moment(dateFilter).format('MM-DD-YYYY')) {
          return (
            <Spike
              spike={spike}
              key={spike.key}
              updateCount={updateCount}
              user={user}
              attending={this.props.attending}
            />
          )
        }
      }
     if(spike.createdBy === user.email && !spike.appr) {
       if(moment(spike.spikeDate).format('MM-DD-YYYY') === moment(dateFilter).format('MM-DD-YYYY')) {
        return (
          <AdminSpike
                user={user}
                admins={this.state.admins}
                spike={spike}
                key={spike.key}
                updateSpike={this.props.updateSpike}
                deleteSpike={this.props.deleteSpike}
                attending={this.props.attending}
          />
        )
       }
     }
    })
  }

  render() {
    const { spikes, assignRooms } = this.state

    let allSpikes = this.filterSpikes(spikes)

    let allDateOptions = this.dateOptions(spikes)

    let roomAssignments = this.assignRooms(spikes, this.state.dateFilter);

    return (
      <section>
        <h1 className="SpikesTitle">Student-Led Spikes</h1>
        <section className="StudentSpikesButtons">
          <button
            className='ShowMapButton'
            onClick={() => this.setState({ floorMap: true })}
          >
            Show Map
          </button>
          <ReactCSSTransitionGroup
            transitionName='AnimateForm'
            transitionEnterTimeout={700}
            transitionLeaveTimeout={700}
          >
            {this.state.floorMap && <FloorMap rooms={roomAssignments} hideMap={()=>this.setState({ floorMap: false })}/>}
          </ReactCSSTransitionGroup>
          <label htmlFor='UserFilterByDate' aria-label='Filter by date'>
            <select
              id='UserFilterByDate'
              name="all"
              value={this.state.dateFilter}
              className="DropdownSelect"
              onChange={(e)=>this.setState({ dateFilter: parseInt(e.target.value) })
              }>
              {allDateOptions}
            </select>
          </label>
        </section>
        <section className="AllSpikes">{allSpikes}</section>
      </section>
    )
  }
}
