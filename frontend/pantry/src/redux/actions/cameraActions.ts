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

const onBarCodeRead = (scanResult) => {
  return (dispatch) => {
    dispatch(scanningBarcode());
    try {
      dispatch(scannedBarcode());
      dispatch(setBarcode(scanResult));
    } catch (err) {
      dispatch(errorScanningBarcode(err));
    }
  };
};

export { onBarCodeRead };
