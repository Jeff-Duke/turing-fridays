import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';

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
      expect(wrapper.find('.AdminSpikeTitle').text()).to.equal('Graduating');
    });

    it('should display the correct description of created spike', () => {
      expect(wrapper.find('.AdminSpikeDescription').text()).to.equal('Make that money!');
    });
    it('should display the correct title of created spike', () => {
      expect(wrapper.find('.AdminSpikeTitle').text()).to.equal('Graduating');
    });
    it('should display the correct title of created spike', () => {
      expect(wrapper.find('.AdminSpikeTitle').text()).to.equal('Graduating');
    });
  });

});
