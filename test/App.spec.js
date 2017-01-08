import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount } from 'enzyme';
import App from '../lib/components/App';
import mockUsers from './helpers/mockUsers';

describe('my test bundle', () => {
  it('should work', () => {
    assert(true);
  });
});

describe('application', () => {
  const wrapper = shallow(<App />);

  context('shallow tests', () => {

    it('App component should exist', () => {
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
    const wrapper = mount(<App />);

    it('has a Sign In component', () => {
      assert.lengthOf(wrapper.find('SignIn'), 1);
    });
  });
});

describe('admin login', () => {
  const wrapper = shallow(<App />);

  context('mock admin sign in rendering', () => {

    const adminUser = mockUsers[0];
    wrapper.setState({ user: adminUser });
    let allAdmins = [ adminUser.email ];

    it('renders as a <section>', () => {
      assert.equal(wrapper.type(), 'section');
    });

    it('the section has a class called Application', () => {
      expect(wrapper.hasClass('Application')).to.equal(true);
    });

    it('has a Header component', () => {
      assert.lengthOf(wrapper.find('Header'), 1);
    });

    it('has an Admin component', () => {
      assert.lengthOf(wrapper.find('Admin'), 1);
    });

  });
});

describe('user sign in', () => {
  const wrapper = shallow(<App />);

    beforeEach(() => {
      const newUser = mockUsers[1];
      wrapper.setState({ user: newUser });
    });

    afterEach(() => {
      wrapper.setState({ user: null });
    });

    context('mock sign in rendering', () => {

    it('renders as a <section>', () => {
      assert.equal(wrapper.type(), 'section');
    });

    it('the section has a class called Application', () => {
      expect(wrapper.hasClass('Application')).to.equal(true);
    });

    it('has a Header component', () => {
      assert.lengthOf(wrapper.find('Header'), 1);
    });

    it('has a Spikes component', () => {
      assert.lengthOf(wrapper.find('Spikes'), 1);
    });
  });

});
