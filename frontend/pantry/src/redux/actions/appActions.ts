import Toast from 'react-native-simple-toast';

import {
  CHANGE_CONNECTION_STATUS,
  FETCHING_CONNECTION_STATE,
} from './actionTypes.ts';

const fetchingConnectionState = () => ({ type: FETCHING_CONNECTION_STATE });

const settingConnectionState = (status: any, connectionType: any) => ({
  type: CHANGE_CONNECTION_STATUS,
  payload: { status, connectionType },
});

const connectionAlert = (status: any, connectionType: any) => {
  // checking if user is completely off network connection
  switch (connectionType) {
    case 'none':
      return Toast.showWithGravity(
        `Your no longer connected to a network`,
        Toast.SHORT,
        Toast.TOP,
      );
    // case 'cellular':
    //   return Toast.showWithGravity(
    //     `Your are now on a cellular connection`,
    //     Toast.SHORT,
    //     Toast.TOP,
    //   );
    default:
      break;
  }
  return status;
};

const connectionState = (status: any, connectionType: any) => {
  return (dispatch: any) => {
    dispatch(fetchingConnectionState());
    try {
      dispatch(settingConnectionState(status, connectionType));
    } catch (error) {
      console.log('checking network error', error);
    }
  };
};

export { connectionState, connectionAlert };
