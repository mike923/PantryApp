import { combineReducers } from 'redux';
import { testReducer } from './testReducer';

const rootReducer = combineReducers({
  testUser: testReducer,
});

export default rootReducer;
