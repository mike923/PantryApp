// import React 'react';
import auth from '@react-native-firebase/auth';
import {
  FETCHING_USER,
  FETCHED_USER,
  SET_USER,
  // UNSET_USER,
  FETCHING_USER_ERROR,
} from './actionTypes';

const fetchingUser = () => ({ type: FETCHING_USER });

const fetchedUser = () => ({ type: FETCHED_USER });

const setUser = (email) => ({ type: SET_USER, payload: email });

const errorLoadingUser = (err) => ({ type: FETCHING_USER_ERROR, payload: err });

//firebase functions to log the user in with email and password
//authenticate if the user has a valid account
const loginUser = (email, password, navigation) => {
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
      });
  };
};

// const registerUser = (email, password, navigation) => {};

const logoutUser = ({ username }) => {
  return (dispatch) => {
    dispatch();
  };
};

export { loginUser, logoutUser };
