import React from 'react';
import firebase from '../firebase';
import moment from 'moment';

const AdminSpike = ({ spike, createSpike, updateSpike, deleteSpike }, key ) => {
  return (
    <section
      className={spike.appr ? "ApprovedSpike" : "SpikeCard AdminSpikeCard"}
      key={key}
    >
      <p>Spike Topic:  <br/> <span className="AdminSpikeTitle">{spike.title}</span></p>
      <p>Description: <br/> <span className="AdminSpikeDescription">{spike.description}</span></p>
      <p>Created by:  <span className="AdminSpikeCreator">{spike.createdBy}</span></p>
      <p>Spike Hosts:  <span className="AdminSpikeHosts">{spike.hosts}</span></p>
      <p>Attendees: </p>
      <ul className="SpikeAttendees">
        {spike.attendees ?
          spike.attendees.map((attendee, index) => {
            return <li className="attendee" key={index}>{attendee}</li>
          })
          : <p><span className="NoSpikeAttendees">No students have joined</span></p>
        }
      </ul>
      <p>
        Date Submitted:  <span className="AdminSpikeCreatedDate">{moment(spike.created_at).format("MM-DD-YYYY")}</span>
      </p>
      <p>
        Spike Session Date:
        <span className="SpikeSessionDate">  {moment(spike.spikeDate).format('MM-DD-YYYY')}</span>
      </p>
      <p>
        Notes for Staff:
        <span className="SpikeNotes">  {spike.notes}</span>
      </p>
      <form className="location-form">
        <p>Assigned location:</p>
        <section>
          <select
            className="ApproveButton"
            name='location'
            onChange={(e)=>updateSpike(spike, 'location', e.target.value)}
            value={spike.location}
          >
            <option value='none'>none</option>
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
        </section>
        <p>Approval Status:
          <span className="ApprovalStatus">{spike.appr ? 'Approved' : 'Pending'}</span>
        </p>
        <button
          className="ApproveButton"
          onClick={(e)=> {
            e.preventDefault();
            updateSpike(spike, 'appr', !spike.appr);
          }}
          disabled={spike.location === ''}>
          {spike.appr ? 'Undo' : 'Approve'}
        </button>
        <button
          className="DeleteButton"
          onClick={(e)=> {
            e.preventDefault()
            deleteSpike(spike)
          }}>
          Delete
        </button>
      </form>
    </section>
  )
}

export default AdminSpike;
