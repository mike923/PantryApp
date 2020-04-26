import {
  SCANNING,
  SCANNED,
  SCANNING_ERROR,
  SET_BARCODES,
} from '../actions/actionTypes.ts';

const initUserState = {
  scanned: false,
  scanning: false,
  error: false,
  barcodes: [],
};

const cameraReducer = (state = initUserState, action) => {
  const stateCopy = { ...state };

  switch (action.type) {
    case SCANNING:
      stateCopy.scanned = true;
      break;

    case SCANNED:
      stateCopy.scanning = false;
      break;
    case SET_BARCODES:
      stateCopy.scanned = true;
      stateCopy.barcodes = [...stateCopy.barcodes, action.payload];
      break;

    case SCANNING_ERROR:
      stateCopy.scanning = false;
      stateCopy.scanned = false;
      stateCopy.error = true;
      break;
    default:
      break;
  }

  return stateCopy;
};

export { initUserState, cameraReducer };
