import { Alert } from 'react-native';

import auth from '@react-native-firebase/auth';
import {
  SCANNING,
  SCANNED,
  UNSET_SCAN,
  SCANNING_ERROR,
} from './actionTypes.ts';

const scanningBarcode = () => ({ type: SCANNING });

const scannedBarcode = () => ({ type: SCANNED });

const setBarcode = (barcode) => ({ type: SCANNED, payload: barcode });

const unsetBarcode = () => ({ type: UNSET_SCAN });

const errorScanningBarcode = (err) => ({ type: SCANNING_ERROR, payload: err });

let barcodes = new Set();

const onBarCodeRead = (scanResult) => {
  return (dispatch) => {
    dispatch(scanningBarcode());
    try {
      if (scanResult.data !== null) {
        if (barcodes.has(scanResult.data)) {
          scannedBarcode();
          setBarcode(scanResult.data);

          barcodes.add(scanResult.data);
          console.log('onBarCodeRead call', barcodes);
        }
      }
    } catch (err) {
      errorScanningBarcode(err);
    }
  };
};

// const scanBarcodes = () => {};

export { onBarCodeRead };

// const loginUser = (email, password) => {
//   return (dispatch) => {
//     dispatch(fetchingUser());

//     auth()
//       .signInWithEmailAndPassword(email, password)
//       .then(() => {
//         dispatch(fetchedUser());
//         dispatch(setUser(email));
//       })
//       .catch((err) => {
//         console.log(err.code);

//         dispatch(errorLoadingUser(err.code));

//         errorMessages(err);
//       });
//   };
// };
