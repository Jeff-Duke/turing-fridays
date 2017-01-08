import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';
import App from '../lib/components/App';
import Header from '../lib/components/Header';
import mockUsers from './helpers/mockUsers';

describe('Header component', () => {
  const wrapper = shallow(
  <Header
    user={mockUsers[2]}
    createSpike={(e) => this.createSpike(e)}
    toggleForm={() => this.toggleForm()}
  />);
  const user = mockUsers[2];

  it('should be rendered into a <header> container', () => {
    assert.equal(wrapper.type(), 'header');
  });

  it('should have multiple props', () => {
    expect(wrapper.props().user).to.be.defined;
    expect(wrapper.props().createSpike).to.be.defined;
    expect(wrapper.props().showForm).to.be.defined;
    expect(wrapper.props().toggleForm).to.be.defined;
  });

  it('should have one logo image and one profile image', () => {
    expect(wrapper.find('img')).to.have.length(2);
  });

  it('should have a Sign Out and Add Spike button', () => {
    expect(wrapper.find('button')).to.have.length(2);
    expect(wrapper.find('.SignOut').text()).to.equal('Sign Out');
    expect(wrapper.find('.AddSpikeButton').text()).to.equal('Add Spike');
  });

  it('should have a title', () => {
    expect(wrapper.find('.HeaderTitle').text()).to.equal('Turing Fridays');
  });

  it('should have a LoginInfo section', () => {
    expect(wrapper.find('.LoginInfo')).to.have.length(1);
  });
});
