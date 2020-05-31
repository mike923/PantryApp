import { combineReducers } from 'redux';
import { testReducer } from './testReducer.ts';
import { userReducer } from './userReducer.ts';
import { cameraReducer } from './cameraReducers.ts';
import { textRecogReducer } from './textRecogReducers.ts';
import { appReducer } from './appReducers.ts';
import { pantryReducer } from './pantryReducer.ts';

const rootReducer = combineReducers({
  testUser: testReducer,
  user: userReducer,
  camera: cameraReducer,
  recog: textRecogReducer,
  appReducer,
  pantry: pantryReducer,
});

export default rootReducer;
