/*
import axios from 'axios';
import {
  FETCHING_USER,
  // FETCHED_USER,
  // SET_USER,
  // UNSET_USER,
  FETCHING_USER_ERROR,
} from './actionTypes';

const fetchingUser = () => ({ type: FETCHING_USER });

const errorLoadingUser = (err) => ({ type: FETCHING_USER_ERROR, payload: err });



const loginUser = ({ username, password }) => {
  return (dispatch) => {
    dispatch(fetchingUser());

    return axios.get(`URL`).then(
      (json) => dispatch(setUser),
      (err) => dispatch(errorLoadingUser(err)),
    );
  };
};

const logoutUser = ({ username }) => {
  return (dispatch) => {
    dispatch()
  }
}

export {
  loginUser,
  logoutUser
}

*/
