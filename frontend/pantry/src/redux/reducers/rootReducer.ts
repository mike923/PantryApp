import { combineReducers } from 'redux';
import { testReducer } from './testReducer.ts';
import { userReducer } from './userReducer.ts';
import { cameraReducer } from './cameraReducers.ts';

const rootReducer = combineReducers({
  testUser: testReducer,
  user: userReducer,
  camera: cameraReducer,
});

export default rootReducer;
