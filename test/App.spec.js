import React from 'react';
import { expect, assert } from 'chai';
import { shallow, mount, render } from 'enzyme';

import App from '../lib/components/App';
import mockUsers from './helpers/mockUsers';

describe('my test bundle', () => {
  it('should work', () => {
    assert(true);
  });
});

describe('application', () => {
  context('shallow tests', () => {
    const wrapper = shallow(<App />);

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

  context('mock sign in rendering', () => {
    const newUser = mockUsers[0];
    const wrapper = shallow(<App />);
    wrapper.setState({ user: newUser });

    it('renders as a <div>', () => {
      assert.equal(wrapper.type(), 'div');
    });

    it('has a Header component', () => {
      assert.lengthOf(wrapper.find('Header'), 1);
    });

    it('has a Spikes component', () => {
      assert.lengthOf(wrapper.find('Spikes'), 1);
    });
  });
});

// **********************************
// describe('ContactList',function(){
//   it('should have no selected Contact and an empty array of contacts', function() {
//     const wrapper = shallow(<ContactList />);
//     expect(wrapper.state().selectedContact).to.equal(null);
//     expect(wrapper.state().contacts).to.deep.equal([]);
//   });
// });
//
// describe('CreateContact',function(){
//   it('should have default states for key values', function() {
//     const wrapper = shallow(<CreateContact />);
//     expect(wrapper.state().contact.firstName).to.equal('');
//     expect(wrapper.state().contact.lastName).to.equal('');
//     expect(wrapper.state().contact.company).to.equal('');
//     expect(wrapper.state().contact.followUp).to.equal(true);
//   });
// });
//
// describe('ActionButtons', () => {
//
//   const button = shallow(<ActionButtons />);
//
//   it('renders as a <button>', () => {
//     assert.equal(button.type(), 'button');
//   });
//
//   it('should have props for id, disabled, handleClick, and text', function () {
//     assert.isDefined(button.props('id'));
//     assert.isDefined(button.props('disabled'));
//     assert.isDefined(button.props('handleClick'));
//     assert.isDefined(button.props('text'));
//   });
//
// });
//
// describe('App', () => {
//   context('shallow tests', () => {
//
//     const wrapper = shallow(<App />)
//   });
//
//   context('Check for components', () => {
//     const wrapper = mount(<App />);
//
//     it('has a message area component', () => {
//       assert.lengthOf(wrapper.find('MessagesArea'), 1);
//     });
//
//     it('has a Users List component', () => {
//       assert.lengthOf(wrapper.find('UsersList'), 1);
//     });
//
//
//     });
//
//     it('has a Sort Buttons component', () => {
//       assert.lengthOf(wrapper.find('SortButtons'), 1);
//     });
//
//     it('has a Sign In component', () => {
//       assert.lengthOf(wrapper.find('SignIn'), 1);
//     });
//
//     it('has a Message Input component', () => {
//       assert.lengthOf(wrapper.find('MessageInput'), 1);
//     });
//   });
//
// describe('CharacterCount', () => {
//   const wrapper = shallow(<CharacterCount />);
//
//   it('renders as a <section>', () => {
//     assert.equal(wrapper.type(), 'section');
//   });
//
//   it('has a default charactersLeft state of 140 characters', function() {
//     assert.equal(wrapper.state('charactersLeft'), 140);
//   });
//
//   it('allows us to set state', () => {
//     const wrapper = mount(<CharacterCount />);
//
//     wrapper.setState({ charactersLeft: 20 });
//    \\\ assert.equal(wrapper.state('charactersLeft'), 20);
//   });
// });
//
// describe('Filter Messages By Input', () => {
//     const wrapper = shallow(<FilterMessagesByInput />);
//
//     it('renders as an article', () => {
//         assert.equal(wrapper.type(), 'article');
//     });
//
//     it('renders an input', () => {
//         assert.lengthOf(wrapper.find('input'), 1);
//     });
// });
//
// describe('Message', () => {
//
//   const wrapper = shallow(<Message message={mockMessages[0]} user={mockMessages[0].user} loggedInUser={mockMessages[0].user}/>);
//   const message = mockMessages[0];
//
//   it('renders as an <li>', () => {
//     assert.equal(wrapper.type(), 'li');
//   });
//
//   it('should render a message date for the message', () => {
//     assert.lengthOf(wrapper.find('.MessageDate'), 2);
//     assert.lengthOf(wrapper.find('.FullDate'), 1);
//     assert.lengthOf(wrapper.find('.MobileDate'), 1);
//   });
//
//   it('should render content for the message', () => {
//     assert.lengthOf(wrapper.find('.MessageContent'), 1);
//   });
//
//   it('should have a delete button for the messages belonging to the logged in user', () => {
//     assert.lengthOf(wrapper.find('.MessageDelete'), 1);
//   });
//
// });
//
// describe('MessageInput', () => {
//   const wrapper = shallow(<MessageInput />);
//
//   it('renders as a <section>', () => {
//     assert.equal(wrapper.type(), 'section');
//   });
//
//   it('should render an input for the message', () => {
//     assert.lengthOf(wrapper.find('textarea'), 1);
//   });
//
//   it('should render two <ActionButtons /> components', () => {
//     assert.lengthOf(wrapper.find('ActionButtons'), 2);
//   });
//
//   it('should render an area for CharacterCount', function() {
//     assert.lengthOf(wrapper.find('CharacterCount'), 1);
//   });
//
//   it('should have an empty string as default state for newMessage', function() {
//     assert.equal(wrapper.state('newMessage'), '');
//   });
//
//   it('allows us to set state', () => {
//     const wrapper = mount(<MessageInput user='user' />);
//
//     wrapper.setState({ newMessage: 'Seems legit.' });
//     assert.equal(wrapper.state('newMessage'), 'Seems legit.');
//   });
// });
//
// describe('Messages Area', function() {
//     const wrapper = shallow(<MessagesArea messages={mockMessages} />)
//
//     it('should be a UL', () => {
//         assert.lengthOf(wrapper.find('ul'), 1);
//     });
//     it('should render messages when messages are passed in', () => {
//         assert.lengthOf(wrapper.find('Message'), 11);
//     });
// });
//
// describe('SortButtons', () => {
//     context('Shallow test', () => {
//         const wrapper = shallow(<SortButtons messages={mockMessages} />)
//         it('should render in an article', () => {
//             assert.equal(wrapper.type(), 'article');
//         });
//
//         it('should have 2 buttons', () => {
//             assert.lengthOf(wrapper.find('ActionButtons'), 2);
//         });
//
//     });
// });
//
// describe('Users List', () => {
//     context('Shallow tests', () => {
//         const wrapper = shallow(<UsersList
//                                   messages = { mockMessages }
//                                   handleFilterByUser={() => console.log('messages filtered') }
//                                   user={'potato'}
//                                 /> )
//
//         it('should render in an article', function() {
//             assert.equal(wrapper.type(), 'article');
//         });
//
//         it('should contain li elements for the users passed in', () => {
//             assert.lengthOf(wrapper.find('li'), 7)
//         })
//     });
// });
