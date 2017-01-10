import React from 'react';
import firebase from '../firebase';
import moment from 'moment';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const AdminSpike = ({ spike, createSpike, updateSpike, deleteSpike, attending }) => {
  return (
    <section
      className={spike.appr ? 'ApprovedSpike' : 'SpikeCard AdminSpikeCard'}
      key={spike.key}
    >
      <p>Spike Topic:<span>{spike.title}</span></p>
      <p>Description:<span>{spike.description}</span></p>
      <p>Created by:<span>{spike.createdBy}</span></p>
      <p>Spike Hosts:<span>{spike.hosts}</span></p>
      <p>Attendees: {spike.attendees && spike.attendees.length}
        <button
          className='ShowAttendeesButton'
          onClick={()=>{
            document.getElementById(`${spike.createdAt}`).style.display = 'block'
          }}
          >
            See all
          </button>
      </p>
      <ReactCSSTransitionGroup
        transitionName='AnimateList'
        transitionEnterTimeout={700}
        transitionLeaveTimeout={700}
      >
        <div id={spike.createdAt} className='AttendeesList'>
          <ul className='AttendeesModal'>
            <button onClick={()=>document.getElementById(`${spike.createdAt}`).style.display = 'none'}
              >Close
            </button>
            {spike.attendees ?
              spike.attendees.map((attendee, index) => {
                return <li className='attendee' key={index}><span>{attendee}</span></li>
              })
              : <p><span>No Attendees Have Joined</span></p>
            }
          </ul>
        </div>
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
      <section className='AdminInputs'>
        <p>Location:
          <select
            className='DropdownSelect'
            name='location'
            onChange={(e)=>updateSpike(spike, 'location', e.target.value)}
            value={spike.location}
          >
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
        </p>
        <p>Status:
          <select
            className='DropdownSelect'
            name='approval'
            onChange={(e)=>updateSpike(spike, 'appr', JSON.parse(e.target.value))}
            value={spike.appr}
            disabled={!spike.location}
          >
            <option value='false'>Pending</option>
            <option value='true'>Approved</option>
          </select>
        </p>
      </section>
      <button
        className='DeleteButton'
        onClick={(e)=> {
          e.preventDefault()
          deleteSpike(spike)
        }}>
        Delete
      </button>
    </section>
  )
}

export default AdminSpike;
