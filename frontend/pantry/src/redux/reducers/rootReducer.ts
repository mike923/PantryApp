import { combineReducers } from 'redux';
import { testReducer } from './testReducer.ts';
import { userReducer } from './userReducer.ts';
import { cameraReducer } from './cameraReducers.ts';
import { textRecogReducer } from './textRecogReducers.ts';

const rootReducer = combineReducers({
  testUser: testReducer,
  user: userReducer,
  camera: cameraReducer,
  recog: textRecogReducer,
});

export default rootReducer;
