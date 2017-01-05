import React from 'react';
import firebase from '../firebase';
import moment from 'moment';

const AdminSpike = ({ spike, createSpike, updateSpike, deleteSpike }, key ) => {
  return (
    <section className="SpikeCard AdminSpikeCard" key={key}>
      <p>Spike Topic:  <br/> <span>{spike.title}</span></p>
      <p>Description: <br/> <span>{spike.description}</span></p>
      <p>Created by:  <span>{spike.createdBy}</span></p>
      <p>Spike Hosts:  <span>{spike.hosts}</span></p>
      <p>Attendees: </p>
      <ul>
        {spike.attendees ?
          spike.attendees.map((attendee, index) => {
            return <li className="attendee" key={index}>{attendee}</li>
          })
          : <p><span>No Attendees Have Joined</span></p>
        }
      </ul>
      <p>
        Date Submitted:  <span>{moment(spike.created_at).format("MM-DD-YYYY")}</span>
      </p>
      <p>
        Spike Session Date:
        <span>  {moment(spike.spikeDate).format('MM-DD-YYYY')}</span>
      </p>
      <p>
        Notes for Staff:
        <span>  {spike.notes}</span>
      </p>
      <form className="location-form">
        <p>Approval Status:
          <span>{spike.appr ?  'Approved' : 'Pending'}</span>
        </p>
        <p className="location-assignment">
          Assigned Location:  <span>{spike.location}</span>
        </p>
        <section className="location-input-container">
          <input
            type='radio'
            name='location'
            value='GBank'
            onClick={(e)=>updateSpike(spike, 'location', e.target.value)}
          /> GBank
          <input
            type='radio'
            name='location'
            value='Gusto'
            onClick={(e)=>updateSpike(spike, 'location', e.target.value)}
          /> Gusto
          <input
            type='radio'
            name='location'
            value='Blake'
            onClick={(e)=>updateSpike(spike, 'location', e.target.value)}
          /> Blake
        </section>
        <button
          className="ApproveButton"
          onClick={(e)=> {
            e.preventDefault();
            updateSpike(spike, 'appr', true);
          }}
          disabled={spike.location === ''}>
          Approve
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
