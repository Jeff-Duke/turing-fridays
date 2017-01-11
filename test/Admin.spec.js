import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';

import App from '../lib/components/App';
import Admin from '../lib/components/Admin';
import AdminSpike from '../lib/components/AdminSpike';
import mockUsers from './helpers/mockUsers';
import mockSpikes from './helpers/mockSpikes';

describe('Admin component', () => {

  context('shallow tests', () => {

    const wrapper = shallow(
      <Admin
        spikes={mockSpikes}
        admins={mockUsers}
        user={mockUsers[0]}
      />);

    it('Admin component should exist', () => {
      expect(wrapper).to.exist;
    });

    it('should be rendered into a <section> container', () => {
      assert.equal(wrapper.type(), 'section');
    });

    it('should have a wrapper class name of "Admin"', () => {
      expect(wrapper.hasClass('Admin')).to.equal(true);
    });

    it('should have a default filter state of "all"', () => {
      expect(wrapper.state().filter).to.equal('all');
    });

    it('should have a default dateFilter state of ""', () => {
      expect(wrapper.state().dateFilter).to.equal('');
    });

    it('should have a default adminList state of false', () => {
      expect(wrapper.state().adminList).to.equal(false);
    });
  });
});
