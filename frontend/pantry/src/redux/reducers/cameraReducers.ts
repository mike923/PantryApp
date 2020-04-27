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
    case SCANNING: {
      stateCopy.scanning = true;
      break;
    }

    case SCANNED: {
      stateCopy.scanning = false;
      break;
    }
    case SET_BARCODES: {
      let interceptSet = new Set(stateCopy.barcodes);
      interceptSet.add(action.payload);
      stateCopy.scanned = true;
      stateCopy.barcodes = [...interceptSet];
      break;
    }

    case SCANNING_ERROR: {
      stateCopy.scanning = false;
      stateCopy.scanned = false;
      stateCopy.error = true;
      break;
    }
    default: {
      return stateCopy;
    }
  }

  return stateCopy;
};

export { initUserState, cameraReducer };
