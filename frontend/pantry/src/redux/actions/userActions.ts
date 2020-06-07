// import React 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { client } from '../../../proxy';
import {
  FETCHING_USER,
  FETCHED_USER,
  SET_USER,
  UNSET_USER,
  FETCHING_USER_ERROR,
} from './actionTypes.ts';

const fetchingUser = () => ({ type: FETCHING_USER });

const fetchedUser = () => ({ type: FETCHED_USER });

const setUser = (email: string, token: string) => ({
  type: SET_USER,
  payload: { email, token },
});

const unsetUser = () => ({ type: UNSET_USER });

const errorLoadingUser = (err: any) => ({
  type: FETCHING_USER_ERROR,
  payload: err,
});

// checking for the error codes
// informing the user about improper inputs
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
      return undefined;
  }
};
// firebase functions to log the user in with email and password
// authenticate if the user has a valid account
const loginUser = (email, password) => {
  return (dispatch) => {
    dispatch(fetchingUser());

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (res: any) => {
        let { user } = res;
        console.log(res);
        let token;
        try {
          token = await user.getIdToken();
          console.log(token);
          client.defaults.headers.common.authtoken = token;
        } catch (error) {
          console.log(error);
        }

        // try {
        let response = await client.get('/test');
        console.log('response from client', response);
        // } catch (error) {
        //   console.log('error with the client', client, error);
        // }

        dispatch(fetchedUser());
        dispatch(setUser(email, token));
      })
      .catch((err) => {
        console.log(err);

        dispatch(errorLoadingUser(err.code));
      });
  };
};

const registerUser = (email, password, pantry) => {
  return (dispatch) => {
    dispatch(fetchingUser());

    // firebase functions to create a user with email and password
    // takes in email and password parameters
    // after account is created, user gets uuid and directed to the home page
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        let token;
        try {
          token = await user.getIdToken();
          console.log(token);
        } catch (error) {
          console.log(error);
        }
        try {
          const { data } = await client.post('/users/add', {
            pantryName: pantry.pantryName,
            newPantry: pantry.newPantry,
            pantryId: pantry.pantryId,
          });
          console.log(data);
        } catch (error) {
          console.log(error);
        }
        dispatch(fetchedUser());
        dispatch(setUser(email, token));
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
