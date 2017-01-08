import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';

import App from '../lib/components/App';
import Admin from '../lib/components/Admin';
import AdminSpike from '../lib/components/AdminSpike';
import mockUsers from './helpers/mockUsers';

describe('application', () => {
  const wrapper = shallow(<Admin />);
  let spike = {
    title: 'testTitle',
    description: 'a test',
    createdBy: 'hellocaseycross@gmail.com',
    hosts: 'Casey & Kirsten',
    attendees: [],
    created_at: Date.now(),
    spikeDate: Date.now(),
    notes: 'Some notes',
    location: '',
    appr: true
  };

  context('shallow tests', () => {
    it('Admin component should exist', () => {
      expect(wrapper).to.exist;
    });

    it('should have a default user of null', function() {
      expect(wrapper.state().user).to.equal(null);
    });

    it('should have a default empty array of spikes', () => {
      expect(wrapper.state().spikes).to.deep.equal([]);
    });
  });

  context('mount tests', () => {
    const wrapper = mount(<Admin />);

    it('has a section with class of SpikeCard', () => {
      assert.lengthOf(wrapper.find('SignIn'), 1);
    });
  });
});
