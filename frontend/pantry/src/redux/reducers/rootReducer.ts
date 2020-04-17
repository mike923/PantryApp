import { combineReducers } from 'redux';
import { testReducer } from './testReducer';
import { userReducer } from './userReducer';

const rootReducer = combineReducers({
  testUser: testReducer,
  user: userReducer,
});

export default rootReducer;
