import axios from 'axios';
import { Alert } from 'react-native';

import {
  SCANNING_RECEIPT,
  SCANNED_RECEIPT,
  SCANNING_RECEIPT_ERROR,
  SET_ITEM,
  // SCANNING_BARCODE,
  // SCANNED_BARCODE,
  // UNSET_RECEIPT_ITEM,
} from './actionTypes.ts';
import { PROXY } from '../../../proxy';

// api methods
const setError = (err: string) => ({
  type: SCANNING_RECEIPT_ERROR,
  payload: err,
});

const scanningReceipt = () => ({ type: SCANNING_RECEIPT });

const scannedReceipt = () => ({ type: SCANNED_RECEIPT });

const setParsedReceipt = (receipt: object) => ({
  type: SET_ITEM,
  payload: receipt,
});

// const setProductFromBarcode = (product: object) => ({
//   type: SCANNED_BARCODE,
//   payload: product,
// });

// const deleteProduct = (data: any) => ({ type: DELETE_PRODUCT, payload: data });

const parseReceipt = (receipt: any) => {
  return async (dispatch: any) => {
    dispatch(scanningReceipt());
    try {
      dispatch(scannedReceipt());
      dispatch(setParsedReceipt(receipt));
    } catch (error) {
      dispatch(setError(error));
    }
  };
};

// const scanToAddProduct = (product: any) => {
//   return async (dispatch: any) => {
//     dispatch(scanningReceipt());
//     try {
//       dispatch(scannedReceipt());
//       dispatch(setProductFromBarcode(product));
//     } catch (error) {
//       dispatch(setError(error));
//     }
//   };
// };

// const deleteItem = (data: object) => {
//   console.log('rargagag');

//   return (dispatch: any) => {
//     dispatch(deleteProduct(data));
//   };
// };

export { parseReceipt };
