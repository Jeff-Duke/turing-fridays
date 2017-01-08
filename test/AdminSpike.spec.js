import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';
import moment from 'moment';


import AdminSpike from '../lib/components/AdminSpike';
import mockUsers from './helpers/mockUsers';
import mockSpikes from './helpers/mockSpikes';

describe('AdminSpike component', () => {

  context('approved spike tests', () => {

    const wrapper = shallow(
      <AdminSpike
        spike={mockSpikes[0]}
        key={mockSpikes[0].key}
      />)

    it('AdminSpike component should exist', () => {
      expect(wrapper).to.exist;
    });

    it('should be rendered into a <section> container', () => {
      assert.equal(wrapper.type(), 'section');
    });

    it('should have the class called ApprovedSpike on the wrapper section container', () => {
      expect(wrapper.hasClass('ApprovedSpike')).to.equal(true);
    });

    it('should have multiple props', () => {
      expect(wrapper.props().spike).to.be.defined;
      expect(wrapper.props().createSpike).to.be.defined;
      expect(wrapper.props().updateSpike).to.be.defined;
      expect(wrapper.props().deleteSpike).to.be.defined;
    });

    it('should have two buttons', () => {
      expect(wrapper.find('button')).to.have.length(2);
    });

    it('should have a form', () => {
      expect(wrapper.find('form')).to.have.length(1);
    });

    it('should have one select fields', () => {
      expect(wrapper.find('select')).to.have.length(1);
    });

    it('should have 11 option selections', () => {
      expect(wrapper.find('option')).to.have.length(11);
    });

    it('should have two buttons', () => {
      expect(wrapper.find('button')).to.have.length(2);
    });

    it('should have two sections', () => {
      expect(wrapper.find('section')).to.have.length(2);
    });

    it('should display the correct title of created spike', () => {
      expect(wrapper.find('.SpikeTitle').text()).to.equal('Graduating');
    });

    it('should display the correct description of created spike', () => {
      expect(wrapper.find('.SpikeDescription').text()).to.equal('Make that money!');
    });

    it('should display the correct creator of created spike', () => {
      expect(wrapper.find('.SpikeCreator').text()).to.equal('hellocaseycross@gmail.com');
    });

    it('should display the correct hosts of created spike', () => {
      expect(wrapper.find('.SpikeHosts').text()).to.equal('All the Caseys');
    });

    it('should display the correct attendess of created spike if there are none', () => {
      expect(wrapper.find('.NoSpikeAttendees').text()).to.equal('No students have joined.');
    });

    it('should not display a list of attendeees of created spike if none have joined', () => {
      expect(wrapper.find('.attendees')).to.have.length(0);
    });

    it('should display the correct session date of created spike', () => {
      let spikeTime = ' ' + moment(mockSpikes[0].spikeDate).format("MM-DD-YYYY");
      expect(wrapper.find('.SpikeSessionDate').text()).to.equal(spikeTime);
    });

    it('should display the correct notes of created spike', () => {
      expect(wrapper.find('.SpikeNotes').text()).to.equal('no notes');
    });

    it('should display the correct approval status of created spike', () => {
      expect(wrapper.find('.ApprovalStatus').text()).to.equal('Approved');
    });
  });

  context('spikes pending approval', () => {

    const wrapper = shallow(
      <AdminSpike
        spike={mockSpikes[1]}
        key={mockSpikes[1].key}
      />)

    it('should have a class called SpikeCard on the wrapper container', () => {
      expect(wrapper.hasClass('SpikeCard')).to.equal(true);
    });

    it('should also have a class called AdminSpikeCard on the wrapper container', () => {
      expect(wrapper.hasClass('SpikeCard')).to.equal(true);
    });

    it('should display the correct approval status of created spike', () => {
      expect(wrapper.find('.ApprovalStatus').text()).to.equal('Pending');
    });
  });

  context('spikes with attendees', () => {
    const wrapper = shallow(
      <AdminSpike
        spike={mockSpikes[2]}
        key={mockSpikes[2].key}
      />)

    it('should display the correct number of attendess if there are some', () => {
      expect(wrapper.find('.attendee')).to.have.length(2);
    });
  });
});
