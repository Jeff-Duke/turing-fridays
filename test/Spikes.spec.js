import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';

import Spikes from '../lib/components/Spikes';
import mockUsers from './helpers/mockUsers';
import mockSpikes from './helpers/mockSpikes';


describe('Spikes component', () => {
  const wrapper = shallow(<Spikes
    createSpike={(e) => this.createSpike(e)}
    spikes={mockSpikes}
    user={mockUsers[2]}
    updateCount={(spike) => this.updateCount(spike)}
                          />);

  it('Spikes component should exist', () => {
    expect(wrapper).to.exist;
  });

  it('should be rendered into a <section> container', () => {
    assert.equal(wrapper.type(), 'section');
  });

  it('should have a dateFilter state', () => {
    expect(wrapper.state().dateFilter).to.equal('all');
  });
});
