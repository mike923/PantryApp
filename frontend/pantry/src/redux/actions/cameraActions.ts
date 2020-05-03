import axios from 'axios';
import { Alert } from 'react-native';

import { SPOONACULAR_API_KEY } from 'react-native-dotenv';
import {
  FETCHING_PRODUCT,
  FETCHED_PRODUCT,
  SET_PRODUCT,
  FETCHING_PRODUCT_ERROR,
} from './actionTypes.ts';

// api methods
const setError = (err) => ({ type: FETCHING_PRODUCT_ERROR, payload: err });

const setProduct = (product) => ({ type: SET_PRODUCT, payload: product });
const fetchingProduct = () => ({ type: FETCHING_PRODUCT });

const fetchedProduct = () => ({ type: FETCHED_PRODUCT });

// const onBarCodeRead = (localPath) => {
//   return async (dispatch) => {
//     dispatch(scanningBarcode());
//     try {
//       const barcodes = await vision().barcodeDetectorProcessImage(localPath);
//       console.log(barcodes);

//       if (barcodes.valueType === 5) {
//         dispatch(scannedBarcode());

//         // alerting user of scanned bar codes
//         Alert.alert(`You scanned ${barcodes[0].rawValue}`);

//         dispatch(setBarcode(barcodes[0].rawValue));
//         dispatch(barcodeApiCalls(barcodes[0].rawValue));
//       }
//     } catch (err) {
//       dispatch(setError(err));
//     }
//   };
// };

const barcodeApiCalls = (upc) => {
  return async (dispatch) => {
    dispatch(fetchingProduct());
    try {
      const { data } = await axios.get(
        `https://api.spoonacular.com/food/products/upc/${upc}?apiKey=${SPOONACULAR_API_KEY}`,
      );
      console.log('actions data', data);

      if (data.status === 'failure') {
        dispatch(setError(data.message));
        Alert.alert(data.message);
      } else {
        Alert.alert(`You successfully scanned item ${upc}`);
        dispatch(fetchedProduct());
        dispatch(setProduct(data));
      }
    } catch (err) {
      console.log(err);
      dispatch(setError(err));
    }
  };
};

export { barcodeApiCalls };
