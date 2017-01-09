import React from 'react';

const GuestSpeaker = ({ speaker }) => {
  if (speaker && speaker.length > 0) {
    return(
      <section className='GuestSpeaker'>
        <h1>This Weeks Guest Speaker</h1>
        <h2 className='SpeakerName'>Guest Speaker:<span>{speaker[0].name}</span></h2>
        <p className='SpeakerDescription'>About the speaker:<span>{speaker[0].description}</span></p>
        <a className='SpeakerLink' target="_blank" href={speaker[0].link}>Speaker Info</a>
      </section>
    )
  } else {
    return <p>No Guest Speaker Scheduled</p>
  }
};

export default GuestSpeaker;
