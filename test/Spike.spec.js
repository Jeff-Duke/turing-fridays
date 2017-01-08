import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';
import Spike from '../lib/components/Spike';

describe('Spike component', () => {
  const wrapper = shallow(<Spike />);

  it('Spike component should exist', () => {
    expect(wrapper).to.exist;
  });

  it('should be rendered into a <section> container', () => {
    assert.equal(wrapper.type(), 'section');
  });

  it('should have the class called Modal on the wrapper section container', () => {
    expect(wrapper.hasClass('Modal')).to.equal(true);
  });

  it('should have multiple props', () => {
    expect(wrapper.props().spike).to.be.defined;
    expect(wrapper.props().createSpike).to.be.defined;
    expect(wrapper.props().updateCount).to.be.defined;
    expect(wrapper.props().toggleForm).to.be.defined;
    expect(wrapper.props().user).to.be.defined;
    expect(wrapper.props().key).to.be.defined;
    expect(wrapper.props().admin).to.be.defined;
  });

  it('should have two buttons', () => {
    expect(wrapper.find('button')).to.have.length(2);
  });

  it('should have a form', () => {
    expect(wrapper.find('form')).to.have.length(1);
  });

  it('should have three input fields', () => {
    expect(wrapper.find('input')).to.have.length(3);
  });

  it('should have two textareas', () => {
    expect(wrapper.find('textarea')).to.have.length(2);
  });

  it('should have one label', () => {
    expect(wrapper.find('label')).to.have.length(1);
  });

  it('should have three sections', () => {
    expect(wrapper.find('section')).to.have.length(3);
  });
});
