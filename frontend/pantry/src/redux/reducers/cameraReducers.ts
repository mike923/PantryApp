import {
  SCANNING,
  SCANNED,
  SCANNING_ERROR,
  DELETE_PRODUCT,
  FETCHING_PRODUCT,
  FETCHED_PRODUCT,
  SET_PRODUCT,
  FETCHING_PRODUCT_ERROR,
} from '../actions/actionTypes.ts';

interface InitCameraState {
  fetchingProduct: boolean;
  fetchedProduct: boolean;
  error: boolean;
  products: any;
  errorMessage: any;
}

const initCameraState: InitCameraState = {
  fetchingProduct: false,
  fetchedProduct: false,
  error: false,
  products: [],
  errorMessage: [],
};

const cameraReducer = (state = initCameraState, action) => {
  const stateCopy = { ...state };

  switch (action.type) {
    case FETCHING_PRODUCT: {
      stateCopy.fetchingProduct = true;
      break;
    }

    case FETCHED_PRODUCT: {
      stateCopy.fetchingProduct = false;
      stateCopy.fetchedProduct = true;
      break;
    }

    case SET_PRODUCT: {
      let productSet = new Set(stateCopy.products);

      if (!productSet.has(action.payload.upc)) {
        productSet.add(action.payload);
      }
      productSet.add(action.payload);
      stateCopy.fetchedProduct = true;
      stateCopy.products = [...productSet];
      break;
    }

    case DELETE_PRODUCT: {
      stateCopy.products = action.payload;
      break;
    }

    case FETCHING_PRODUCT_ERROR: {
      stateCopy.fetchingProduct = false;
      stateCopy.fetchedProduct = false;
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

export { initCameraState, cameraReducer };
