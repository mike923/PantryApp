import {
  FETCHING_USER,
  FETCHED_USER,
  SET_USER,
  UNSET_USER,
} from '../actions/actionTypes';

const initUserState = {
  userInfo: {
    username: '',
  },
  loggedIn: false,
  loading: false,
  error: false,
  errorMsgs: [],
};

const userReducer = (state, action) => {
  const stateCopy = { ...state };

  switch (action.type) {
    case FETCHING_USER:
      stateCopy.loading = true;
      break;

    case FETCHED_USER:
      stateCopy.loading = false;
      break;

    case SET_USER:
      stateCopy.loggedIn = true;
      stateCopy.userInfo.username = action.payload.username;
      break;

    case UNSET_USER:
      stateCopy.loggedIn = false;
      stateCopy.userInfo.username = '';
      break;

    default:
      break;
  }

  return stateCopy;
};

export { initUserState, userReducer };
