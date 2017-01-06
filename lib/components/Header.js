import React from 'react';
import { signOut } from '../firebase';
import Spike from './Spike';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Header = ({ user, createSpike, showForm, toggleForm }) => {
  return (
    <header className="Header">
      <img className="Logo" src="https://www.turing.io/sites/default/files/turing-logo_1_0.png" />
      <h1 className="HeaderTitle">Turing Fridays</h1>
      <section className="LoginInfo">
        <button className="SignOut" onClick={() => signOut()}>Sign Out</button>
        <img className="UserPhoto" src={user.photoURL} />
        <pre className="UserEmail">{user.email}</pre>
      </section>
      <ReactCSSTransitionGroup
        transitionName='AnimateForm'
        transitionEnterTimeout={500}
        transitionLeaveTimeout={500}
      >
        {!showForm && <button
          className="AddSpikeButton"
          onClick={() => toggleForm()}>Add Spike
        </button>}
        {showForm && <Spike
          createSpike={createSpike}
          toggleForm={toggleForm}
        />}
      </ReactCSSTransitionGroup>
    </header>
  )
}

export default Header;
