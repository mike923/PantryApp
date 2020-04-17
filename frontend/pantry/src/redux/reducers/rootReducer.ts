import { combineReducers } from 'redux';
import { testReducer } from './testReducer.ts';

const rootReducer = combineReducers({
    testUser: testReducer,
});

export default rootReducer;
