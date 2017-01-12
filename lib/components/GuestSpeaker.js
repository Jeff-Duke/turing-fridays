import React from 'react';

const GuestSpeaker = ({ speaker, updateSpeakerAttendees, attendingSpeaker }) => {
  if (speaker && speaker.length > 0) {
    return (
      <section className='GuestSpeaker'>
        <h2>Our Guest Speaker This Week: </h2>
        <p className='SpeakerName'>Guest Speaker:<span>{speaker[0].name}</span></p>
        <p className='SpeakerDescription'>About the speaker:<span>{speaker[0].description}</span></p>
        <a className='FridayLink' target="_blank" href={speaker[0].link}>Click here for info on this speaker</a>
        <p>Guest Speaker Attendees Count: <span>{speaker[0].attendees ? speaker[0].attendees.length : 0}</span></p>
        <button
          className='AttendingSpeakerButton'
          onClick={() => updateSpeakerAttendees()}
        >
          { attendingSpeaker ? 'Leave' : 'Join' }
        </button>
      </section>
    )
  } else {
    return (
      <section className='GuestSpeaker'>
        <h2>No Guest Speaker Scheduled</h2>
      </section>
    )
  }
};

export default GuestSpeaker;
