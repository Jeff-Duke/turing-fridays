'use strict';
import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyCFZyt-Iyu68wk5ByjLgCeXBDT7YQ8FOx8',
    authDomain: 'turing-fridays.firebaseapp.com',
    databaseURL: 'https://turing-fridays.firebaseio.com',
    storageBucket: 'turing-fridays.appspot.com',
    messagingSenderId: '49309652660'
  };
  firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.GithubAuthProvider();

export default firebase;
export const signIn = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();
export const reference = firebase.database().ref('spikes');
export const adminReference = firebase.database().ref('admins');
