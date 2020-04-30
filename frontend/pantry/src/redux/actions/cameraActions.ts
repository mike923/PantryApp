import axios from 'axios';
import { SPOONACULAR_API_KEY } from 'react-native-dotenv';
import {
  SCANNING,
  SCANNED,
  UNSET_SCAN,
  SCANNING_ERROR,
  SET_BARCODES,
  FETCHING_PRODUCT,
  FETCHED_PRODUCT,
  SET_PRODUCT,
} from './actionTypes.ts';

const scanningBarcode = () => ({ type: SCANNING });

const scannedBarcode = () => ({ type: SCANNED });

const setBarcode = (barcode) => ({ type: SET_BARCODES, payload: barcode });

// const unsetBarcode = () => ({ type: UNSET_SCAN });

const setError = (err) => ({ type: SCANNING_ERROR, payload: err });

// api methods
const fetchingProduct = () => ({ type: FETCHING_PRODUCT });

const fetchedProduct = () => ({ type: FETCHED_PRODUCT });

const setProduct = (product) => ({ type: SET_PRODUCT, payload: product });

const onBarCodeRead = (barcode) => {
  return (dispatch) => {
    dispatch(scanningBarcode());
    try {
      dispatch(scannedBarcode());
      dispatch(setBarcode(barcode));
    } catch (err) {
      dispatch(setError(err));
    }
  };
};

const barcodeApiCalls = (upc) => {
  return async (dispatch) => {
    dispatch(fetchingProduct());
    try {
      const { data } = await axios.get(
        `https://api.spoonacular.com/food/products/upc/${upc}?${SPOONACULAR_API_KEY}`,
      );
      dispatch(fetchedProduct());
      dispatch(setProduct(data));
    } catch (err) {
      // console.log(err);
      dispatch(setError(err));
    }
  };
};

export { onBarCodeRead, barcodeApiCalls };
