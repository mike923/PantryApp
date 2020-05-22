import {
  SCANNING_RECEIPT,
  SCANNED_RECEIPT,
  SCANNING_RECEIPT_ERROR,
  SET_ITEM,
} from '../actions/actionTypes.ts';

const initUserState = {
  scanningReceipt: false,
  scannedReceipt: false,
  error: false,
  receipt: {},
  errorMessage: [],
};

const textRecogReducer = (state = initUserState, action: any) => {
  const stateCopy = { ...state };

  switch (action.type) {
    case SCANNING_RECEIPT: {
      stateCopy.scanningReceipt = true;
      break;
    }
    case SCANNED_RECEIPT: {
      stateCopy.scanningReceipt = false;
      stateCopy.scannedReceipt = true;
      console.log('text', action.payload);

      break;
    }
    case SET_ITEM: {
      stateCopy.receipt = action.payload;
      break;
    }
    // case BARCODE_SCANNED: {
    //   stateCopy.receipt = action.payload;
    //   break;
    // }
    case SCANNING_RECEIPT_ERROR: {
      stateCopy.scanningReceipt = false;
      stateCopy.scannedReceipt = false;
      stateCopy.error = true;
      stateCopy.errorMessage = [action.payload];
      break;
    }
    default: {
      return stateCopy;
    }
  }

  return stateCopy;
};

export { initUserState, textRecogReducer };
