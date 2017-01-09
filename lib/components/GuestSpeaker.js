import React from 'react';

const GuestSpeaker = ({ speaker }) => {
  if (speaker && speaker.length > 0) {
    return(
      <section>
        <h1>This Weeks Guest Speaker</h1>
        <h2>{speaker[0].name}</h2>
        <p>{speaker[0].description}</p>
        <a target="_blank" href={speaker[0].link}>Speaker Info</a>
      </section>
    )
  } else {
    return <p>No Guest Speaker Scheduled</p>
  }
};

export default GuestSpeaker;
