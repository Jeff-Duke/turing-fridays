import React from 'react';
import { shallow } from 'enzyme';
import { expect, assert } from 'chai';
import App from '../lib/components/App';

describe('application', () => {
  it('renders in a <div>', () => {
    const wrapper = shallow(<App />);
    assert.equal(wrapper.type(), 'div');
  });
});
