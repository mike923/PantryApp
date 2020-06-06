import { Alert } from 'react-native';

import Toast from 'react-native-simple-toast';
import {
  FETCHING_PRODUCT,
  FETCHED_PRODUCT,
  SET_PRODUCT,
  FETCHING_PRODUCT_ERROR,
  DELETE_PRODUCT,
} from './actionTypes.ts';
import { client } from '../../../proxy';

// api methods
const setError = (err: string) => ({
  type: FETCHING_PRODUCT_ERROR,
  payload: err,
});

const setProduct = (product: object) => ({
  type: SET_PRODUCT,
  payload: product,
});
const fetchingProduct = () => ({ type: FETCHING_PRODUCT });

const fetchedProduct = () => ({ type: FETCHED_PRODUCT });

const deleteProduct = (data: any) => ({ type: DELETE_PRODUCT, payload: data });

const barcodeApiCalls = (upc: string) => {
  return async (dispatch) => {
    dispatch(fetchingProduct());
    try {
      const { data } = await client.get(`/allFoods/checkByUPC/${upc}`);
      // `https://api.spoonacular.com/food/products/upc/${upc}?apiKey=${SPOONACULAR_API_KEY}`,
      console.log('actions data', data);

      if (data.payload.name === undefined) {
        dispatch(setError(`Item not found`));
        Toast.showWithGravity(`Item not found`, Toast.LONG, Toast.TOP);
      } else {
        Toast.showWithGravity(
          `${data.payload.name} was scanned`,
          Toast.LONG,
          Toast.TOP,
        );
      }

      if (data.error) {
        dispatch(setError(data.message));
        Alert.alert(data.message);
      } else {
        // Alert.alert(`You successfully scanned item ${upc}`);
        dispatch(fetchedProduct());
        dispatch(setProduct(data.payload));
      }
    } catch (err) {
      console.log(err);
      dispatch(setError(err));
    }
  };
};

const deleteItem = (data: object) => {
  console.log('delete', data);

  return (dispatch: any) => {
    dispatch(deleteProduct(data));
  };
};

export { barcodeApiCalls, deleteItem, setError };
