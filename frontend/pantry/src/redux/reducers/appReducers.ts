import {
  CHANGE_CONNECTION_STATUS,
  FETCHING_CONNECTION_STATE,
} from '../actions/actionTypes.ts';

interface AppInitialState {
  checkingStatus: boolean;
  isConnected: object;
}
const appInitialState: AppInitialState = {
  checkingStatus: false,
  isConnected: {
    status: false,
    connectionType: '',
  },
};

const appReducer = (stateCopy = appInitialState, action: any) => {
  switch (action.type) {
    case FETCHING_CONNECTION_STATE: {
      stateCopy.checkingStatus = true;
      break;
    }
    case CHANGE_CONNECTION_STATUS: {
      stateCopy.checkingStatus = false;
      stateCopy.isConnected = action.payload;
      break;
      //   stateCopy.connectionType = action.payload.connectionType;
    }
    default: {
      return stateCopy;
    }
  }
  return stateCopy;
};
export { appInitialState, appReducer };
