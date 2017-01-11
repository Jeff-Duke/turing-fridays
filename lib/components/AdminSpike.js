import React, {Component} from 'react';
import firebase from '../firebase';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class AdminSpike extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spike: this.props.spike
    };
  }

  handleEdits(e, spike, value) {
    this.props.updateSpike(spike, value, e.target.innerHTML);
  }

  render() {
    const {user, spike, admins, updateSpike} = this.props;
    return (
      <section
        className={spike.appr ? 'ApprovedSpike' : 'SpikeCard AdminSpikeCard'}
        key={spike.key}>
        <p>Spike Topic:
          <span
            contentEditable={false}
            onBlur={(e) => {
              this.handleEdits(e, this.state.spike, 'title')
            }}
            onClick={(e) => {
              e.target.contentEditable = 'true'
            }}>{spike.title}
          </span>
        </p>
        <p>Description:
          <span
            contentEditable={false}
            onBlur={(e) => {
              this.handleEdits(e, this.state.spike, 'description')
            }}
            onClick={(e) => {
              e.target.contentEditable = 'true'
            }}>{spike.description}
          </span>
        </p>
        <p>Created by:
          <span>{spike.createdBy}</span>
        </p>
        <p>Spike Hosts:
          <span
            contentEditable={false}
            onBlur={(e) => {
              this.handleEdits(e, this.state.spike, 'hosts')
            }}
            onClick={(e) => {
              e.target.contentEditable = 'true'
            }}>{spike.hosts}
          </span>
        </p>
        <p>Attendees: {spike.attendees && spike.attendees.length}
          <button
            className='ShowAttendeesButton'
            onClick={() => {
            document.getElementById(`${spike.createdAt}`).style.display = 'block'
          }}>
            See all
          </button>
        </p>
        <ReactCSSTransitionGroup
          transitionName='AnimateAttendeeList'
          transitionEnterTimeout={700}
          transitionLeaveTimeout={700}>
          <section id={spike.createdAt} className='AttendeesList'>
            <ul className='AttendeesModal'>
              <button
                className='CloseAttendeeListButton'
                onClick={() => document.getElementById(`${spike.createdAt}`).style.display = 'none'}>Close
              </button>
              {spike.attendees
                ? spike.attendees.map((attendee, index) => {
                    return <li className='attendee' key={index}>
                      <span>{attendee}</span>
                    </li>
                  })
                : <p>
                  <span>No Attendees Have Joined</span>
                </p>
}
            </ul>
          </section>
        </ReactCSSTransitionGroup>
        <p>
          Date Submitted:<span>{moment(spike.createdAt).format('MM-DD-YYYY')}</span>
        </p>
        <p>
          Spike Session Date:
          <span>{moment(spike.spikeDate).format('MM-DD-YYYY')}</span>
        </p>
        <p>
          Notes for Staff:<span>{spike.notes}</span>
        </p>
        {admins && user && admins.includes(user.email) && <section className='AdminInputs'>
          <p>Location:
            <label htmlFor='DropdownSelect' aria-label='Location select dropdown'>
              <select
                className='DropdownSelect'
                name='location'
                onChange={(e) => updateSpike(spike, 'location', e.target.value)}
                value={spike.location}>
                <option value='none'>None Assigned</option>
                <option value='Classroom A'>Classroom A</option>
                <option value='Classroom B'>Classroom B</option>
                <option value='Classroom C'>Classroom C</option>
                <option value='Classroom D'>Classroom D</option>
                <option value='Classroom E'>Classroom E</option>
                <option value='Classroom F'>Classroom F</option>
                <option value='Classroom G'>Classroom G</option>
                <option value='Classroom H'>Classroom H</option>
                <option value='Grand Room'>Grand Room</option>
                <option value='Vault Study'>Vault Study</option>
              </select>
            </label>
          </p>
          <p>Status:
            <label htmlFor='DropdownSelect' aria-label='Spike status dropdown'>
              <select
                className='DropdownSelect'
                name='approval'
                onChange={(e) => updateSpike(spike, 'appr', JSON.parse(e.target.value))}
                value={spike.appr}
                disabled={!spike.location}>
                <option value='false'>Pending</option>
                <option value='true'>Approved</option>
              </select>
            </label>
          </p>
        </section>
}
        <button
          className='DeleteButton'
          onClick={(e) => {
            e.preventDefault()
            deleteSpike(spike)
          }}>
          Delete
        </button>
      </section>
    )
  }
}