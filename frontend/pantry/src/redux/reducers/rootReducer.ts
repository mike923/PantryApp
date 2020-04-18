import { combineReducers } from 'redux';
import { testReducer } from './testReducer.ts';
import { userReducer } from './userReducer.ts';

const rootReducer = combineReducers({
  testUser: testReducer,
  user: userReducer,
});

export default rootReducer;
