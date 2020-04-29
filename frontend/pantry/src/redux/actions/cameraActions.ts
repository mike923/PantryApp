import { Alert } from 'react-native';
import {
  SCANNING,
  SCANNED,
  UNSET_SCAN,
  SCANNING_ERROR,
  SET_BARCODES,
} from './actionTypes.ts';

const scanningBarcode = () => ({ type: SCANNING });

const scannedBarcode = () => ({ type: SCANNED });

const setBarcode = (barcode) => ({ type: SET_BARCODES, payload: barcode });

// const unsetBarcode = () => ({ type: UNSET_SCAN });

const errorScanningBarcode = (err) => ({ type: SCANNING_ERROR, payload: err });

const onBarCodeRead = (barcode) => {
  Alert.alert(`Barcode ${barcode} was scanned`);
  return (dispatch) => {
    dispatch(scanningBarcode());
    try {
      dispatch(scannedBarcode());
      dispatch(setBarcode(barcode));
    } catch (err) {
      dispatch(errorScanningBarcode(err));
    }
  };
};

export { onBarCodeRead };
