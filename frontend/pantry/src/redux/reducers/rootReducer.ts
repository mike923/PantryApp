import { combineReducers } from 'redux';
import { testReducer } from './testReducer.ts';
import { userReducer } from './userReducer.ts';
import { cameraReducer } from './cameraReducers.ts';
import { textRecogReducer } from './textRecogReducers.ts';
import { appReducer } from './appReducer.ts';

const rootReducer = combineReducers({
  testUser: testReducer,
  user: userReducer,
  camera: cameraReducer,
  recog: textRecogReducer,
  appReducer,
});

export default rootReducer;
