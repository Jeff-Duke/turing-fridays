import React, {Component} from 'react';
import firebase from '../firebase';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import EditableSvg from './EditableSvg';

export default class AdminSpike extends Component {

  constructor(props) {
    super(props);
    this.state = {
      spike: this.props.spike,
      showAttendees: false,
    };
  }

  handleEdits(e, spike, value) {
    this.props.updateSpike(spike, value, e.target.innerHTML);
  }

  renderCheckmark() {
    return (
      <svg className='ApproveStatusIcon Checkmark' width='50px' height='50px' viewBox='0 0 50 50'>
        <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <g fill='#037D86'>
            <path d='M50,25 C50,11.1914062 38.8085938,0 25,0 C11.1914063,0 0,11.1914062 0,25 C0,38.8085938 11.1914062,50 25,50 C38.8085938,50 50,38.8085938 50,25 L50,25 L50,25 Z M44.1113281,15.2636719 L20.5761719,38.7988281 L20.5761719,38.7988281 L18.8964844,40.4785156 L5.88867188,27.4707031 L11.6308594,21.7285156 L18.90625,29.0039062 L38.3789062,9.53125 L44.1113281,15.2636719 L44.1113281,15.2636719 L44.1113281,15.2636719 Z' id='Shape'></path>
          </g>
        </g>
      </svg>
    );
  }

  renderPendingSymbol() {
    return (
      <svg className='ApproveStatusIcon' width='50px' height='50px' viewBox='0 0 50 50'>
        <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
          <g fill='#E8D268'>
            <path d='M21.875,34.375 L21.875,40.625 L28.125,40.625 L28.125,34.375 L21.875,34.375 Z M25,50 C11.1928806,50 0,38.8071187 0,25 C0,11.1928813 11.1928806,0 25,0 C38.8071188,0 50,11.1928813 50,25 C50,38.8071187 38.8071188,50 25,50 L25,50 Z M21.875,9.375 L21.875,31.25 L28.125,31.25 L28.125,9.375 L21.875,9.375 Z' id='Oval-208-copy'></path>
          </g>
        </g>
      </svg>
    )
  }

  render() {
    const {user, spike, admins, updateSpike, deleteSpike } = this.props;
    return (
      <section
        className={spike.appr ? 'ApprovedSpike' : 'SpikeCard AdminSpikeCard'}
        key={spike.key}>
        <p>Spike Topic:
          <span
            className='SpikeTitle'
            contentEditable={false}
            onBlur={(e) => {
              this.handleEdits(e, this.state.spike, 'title')
            }}
            onClick={(e) => {
              e.target.contentEditable = 'true'
            }}>{spike.title}
          </span>  <EditableSvg />
        </p>
        <p>Description:
          <span
            className='SpikeDescription'
            contentEditable={false}
            onBlur={(e) => {
              this.handleEdits(e, this.state.spike, 'description')
            }}
            onClick={(e) => {
              e.target.contentEditable = 'true'
            }}>{spike.description}
          </span>  <EditableSvg />
        </p>
        <p>Created by:
          <span className="SpikeCreator">{spike.createdBy}</span>
        </p>
        <p>Spike Hosts:
          <span
            className="SpikeHosts"
            contentEditable={false}
            onBlur={(e) => {
              this.handleEdits(e, this.state.spike, 'hosts')
            }}
            onClick={(e) => {
              e.target.contentEditable = 'true'
            }}>{spike.hosts}
          </span>  <EditableSvg />
        </p>
        <p>Attendees: {spike.attendees && spike.attendees.length}
          <button
            className='ShowAttendeesButton'
            onClick={() => this.setState({ showAttendees: !this.state.showAttendees })}>
            See all
          </button>
        </p>
        <ReactCSSTransitionGroup
          transitionName='AnimateAttendeeList'
          transitionEnterTimeout={700}
          transitionLeaveTimeout={700}>
          {this.state.showAttendees && <section id={spike.createdAt} className='AttendeesList'>
            <ul className='AttendeesModal'>
              <button
                className='CloseAttendeeListButton'
                onClick={() => this.setState({ showAttendees: !this.state.showAttendees })}
              >
                Close
              </button>
              {spike.attendees
                ? spike.attendees.map((attendee, index) => {
                    return <li className='Attendee' key={index}>
                      <span>{attendee}</span>
                    </li>
                    })
                  : <p>
                  <span>No Attendees Have Joined</span>
                </p>
              }
            </ul>
          </section>}
        </ReactCSSTransitionGroup>
        <p>
          Date Submitted:<span>{moment(spike.createdAt).format('MM-DD-YYYY')}</span>
        </p>
        <p>
          Spike Session Date:
          <span className="SpikeSessionDate">{moment(spike.spikeDate).format('MM-DD-YYYY')}</span>
        </p>
        <p>
          Notes for Staff:<span className="SpikeNotes">{spike.notes}</span>
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
                <option className='Pending' value='false'>Pending</option>
                <option className='Approved' value='true'>Approved</option>
              </select>
            </label>
          </p>
        </section>
        }
        <article className='ApprovedStatus'>
          {spike.appr ? this.renderCheckmark() : this.renderPendingSymbol()}
        </article>
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
