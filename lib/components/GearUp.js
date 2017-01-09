import React from 'react';

const GearUp = ({ gearUp }) => {
  if (gearUp && gearUp.length > 0) {
    return(
      <div>
        <h1>Gear Up</h1>
        <h2>{gearUp[0].title}</h2>
        <h2>{gearUp[0].description}</h2>
        <h2>{gearUp[0].link}</h2>
      </div>
    )
  } else {
    return <p>No Gear Up Scheduled</p>
  }
};

export default GearUp;
