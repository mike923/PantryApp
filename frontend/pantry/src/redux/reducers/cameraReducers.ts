import {
  SCANNING,
  SCANNED,
  SCANNING_ERROR,
  SET_BARCODES,
  FETCHING_PRODUCT,
  FETCHED_PRODUCT,
  SET_PRODUCT,
  FETCHING_PRODUCT_ERROR,
} from '../actions/actionTypes.ts';

const initUserState = {
  cameraPic: {
    scanned: false,
    scanning: false,
    barcodes: [],
  },
  apiCalls: {
    fetching: false,
    fetched: false,
    productInfo: [],
  },
  error: false,
  errorMessage: [],
};

const cameraReducer = (state = initUserState, action) => {
  const stateCopy = { ...state };

  switch (action.type) {
    case SCANNING: {
      stateCopy.cameraPic = {
        scanning: true,
      };
      break;
    }

    case SCANNED: {
      stateCopy.cameraPic = {
        scanning: false,
        scanned: true,
      };
      break;
    }
    case SET_BARCODES: {
      let interceptSet = new Set(stateCopy.barcodes);
      interceptSet.add(action.payload);

      stateCopy.cameraPic = {
        scanned: true,
        barcodes: [...interceptSet],
      };
      break;
    }

    case SCANNING_ERROR: {
      stateCopy.cameraPic = {
        scanning: false,
        scanned: false,
      };
      stateCopy.error = true;
      stateCopy.errorMessage = [action.payload];
      break;
    }

    case FETCHING_PRODUCT: {
      stateCopy.apiCalls = {
        fetching: true,
        fetched: false,
      };
      break;
    }

    case FETCHED_PRODUCT: {
      stateCopy.apiCalls = {
        fetching: false,
        fetched: true,
      };
      break;
    }
    case SET_PRODUCT: {
      let temp = stateCopy.apiCalls.productInfo;
      stateCopy.apiCalls = {
        fetching: false,
        fetched: true,
        productInfo: [...temp, action.payload.product],
      };
      break;
    }

    case FETCHING_PRODUCT_ERROR: {
      stateCopy.apiCalls = {
        fetching: false,
        fetched: true,
      };
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

export { initUserState, cameraReducer };
