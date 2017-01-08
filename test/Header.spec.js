import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';
import App from '../lib/components/App';
import Header from '../lib/components/Header';
import mockUsers from './helpers/mockUsers';

describe('Header component', () => {
  const wrapper = shallow(
  <Header
    user={ mockUsers[2] }
    createSpike={(e) => this.createSpike(e)}
    toggleForm={() => this.toggleForm()}
  />);

  context('mock user sign in rendering', () => {

    it('should be rendered into a <header> container', () => {
      assert.equal(wrapper.type(), 'header');
    });
  });
});
