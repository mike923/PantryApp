// import React 'react';
import { Alert } from 'react-native';

import auth from '@react-native-firebase/auth';
import {
  FETCHING_USER,
  FETCHED_USER,
  SET_USER,
  UNSET_USER,
  FETCHING_USER_ERROR,
} from './actionTypes';

const fetchingUser = () => ({ type: FETCHING_USER });

const fetchedUser = () => ({ type: FETCHED_USER });

const setUser = (email) => ({ type: SET_USER, payload: email });

const unsetUser = () => ({ type: UNSET_USER });

const errorLoadingUser = (err) => ({ type: FETCHING_USER_ERROR, payload: err });

//checking for the error codes
//informing the user about improper inputs
const errorMessages = (err) => {
  switch (err.code) {
    case 'auth/email-already-in-use':
      return Alert.alert('Invalid credentials \n Please try again!');
    case 'auth/invalid-email':
      return Alert.alert('Invalid credentials \n please try again!');
    case 'auth/weak-password':
      return Alert.alert('Invalid credentials \n please try again!');
    case 'auth/wrong-password':
      return Alert.alert('Invalid credentials \n please try again!');
    case 'auth/user-not-found':
      return Alert.alert('Invalid credentials \n please try again!');
    default:
      break;
  }
};

//firebase functions to log the user in with email and password
//authenticate if the user has a valid account
const loginUser = (email, password) => {
  return (dispatch) => {
    dispatch(fetchingUser());

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(fetchedUser);
        dispatch(fetchedUser());
        dispatch(setUser(email));
      })
      .catch((err) => {
        console.log(err.code);

        dispatch(errorLoadingUser(err.code));

        errorMessages(err);
      });
  };
};

const registerUser = (email, password) => {
  return (dispatch) => {
    dispatch(fetchingUser());

    //firebase functions to create a user with email and password
    //takes in email and password parameters
    //after account is created, user gets uuid and directed to the home page
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(fetchedUser);
        dispatch(fetchedUser());
        dispatch(setUser(email));
        console.log('User account created & signed in!');
      })
      .catch((err) => {
        dispatch(errorLoadingUser(err.code));

        errorMessages(err);
      });
  };
};

const resetPassword = (email) => {
  return (dispatch) => {
    dispatch(fetchingUser);

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('password reset');
        dispatch(fetchedUser);
      })
      .catch((err) => {
        dispatch(errorLoadingUser(err.code));

        errorMessages(err);
      });
  };
};

const logoutUser = ({ username }) => {
  return (dispatch) => {
    auth()
      .signOut()
      .then(() => {
        dispatch(unsetUser);
        console.log('User signed out!');
      });
  };
};

export { loginUser, logoutUser, registerUser, resetPassword };
