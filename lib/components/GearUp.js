import React from 'react';

const GearUp = ({ gearUp }) => {
  if (gearUp && gearUp.length > 0) {
    return(
      <section className="GearUp">
        <h2>Gear Up:</h2>
        <p>Title: <span>{gearUp[0].title}</span></p>
        <p>Description: <span>{gearUp[0].description}</span></p>
        <a className="FridayLink" target="_blank" href={gearUp[0].link}>Link to Markdown</a>
      </section>
    )
  } else {
    return (
      <section className="GearUp">
        <h2>No Gear Up Scheduled</h2>
      </section>
    )
  }
};

export default GearUp;
