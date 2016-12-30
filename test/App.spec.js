import React from 'react';
import { shallow } from 'enzyme';
import { expect, assert } from 'chai';
import App from '../lib/components/App';

describe('my test bundle', () => {
  it('should work', () => {
    assert(true);
  });
});

describe('application', () => {
  const wrapper = shallow(<App />);

  it('renders in a <div>', () => {
    assert.equal(wrapper.type(), 'div');
  });
});
