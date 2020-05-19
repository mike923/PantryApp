import {
  FETCHING_USER,
  FETCHED_USER,
  SET_USER,
  UNSET_USER,
  FETCHING_USER_ERROR,
} from '../actions/actionTypes.ts';

const initUserState = {
  userInfo: {
    email: '',
    token: '',
  },
  loggedIn: false,
  loading: false,
  error: false,
  errorMsgs: [],
};

const userReducer = (state = initUserState, action) => {
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
      stateCopy.userInfo.email = action.payload.email;
      stateCopy.userInfo.token = action.payload.token;
      break;

    case UNSET_USER:
      stateCopy.loggedIn = false;
      stateCopy.userInfo.email = '';
      break;

    case FETCHING_USER_ERROR:
      stateCopy.loading = false;
      stateCopy.loggedIn = false;
      stateCopy.error = true;
      stateCopy.errorMsgs = [action.payload];
      break;
    default:
      break;
  }

  return stateCopy;
};

export { initUserState, userReducer };
