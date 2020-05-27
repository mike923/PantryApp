import {
  CHANGE_CONNECTION_STATUS,
  FETCHING_CONNECTION_STATE,
} from './actionTypes.ts';

const fetchingConnectionState = () => ({ type: FETCHING_CONNECTION_STATE });

const settingConnectionState = (status: any, connectionType: any) => ({
  type: CHANGE_CONNECTION_STATUS,
  payload: { status, connectionType },
});

const connectionState = (status: any, connectionType: any) => {
  return (dispatch: any) => {
    dispatch(fetchingConnectionState());
    try {
      dispatch(settingConnectionState(status, connectionType));
    } catch (error) {
      console.log(error);
    }
  };
};

export { connectionState };
