import React, { useEffect, useState, useRef } from 'react';
import { View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Slider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import vision from '@react-native-firebase/ml-vision';
import Toast from 'react-native-simple-toast';
import { barcodeApiCalls } from '../../redux/actions/cameraActions.ts';

import { styles, colors } from './cameraStyles.ts';

const Camera = ({ navigation, modalVisible }: any) => {
  const camera: any = useSelector((state) => state.camera);
  const receipt: any = useSelector((state) => state.recog.receipt.recieptItems);
  // const receipt: object = useSelector((state) => state.recog.receipt);

  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (camera.products.length) {
      let last: number = camera.products.length - 1;
      setTitle(camera.products[last].name);
    }
  }, [dispatch, camera]);

  const [zoomValue, setZoomValue] = useState(0);
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
  // const [modalVisible, setModalVisible] = useState(false);

  // camera functionalities
  let cameraRef = useRef(null);

  const toggleFlash = () => {
    if (flash === RNCamera.Constants.FlashMode.off) {
      setFlash(RNCamera.Constants.FlashMode.torch);
    } else setFlash(RNCamera.Constants.FlashMode.off);
  };

  // function that takes picture and dispatch barcode search
  const takePicture = async () => {
    try {
      if (cameraRef.current) {
        const options = {
          quality: 0.8,
          base64: true,
          skipProcessing: true,
        };
        const { uri } = await cameraRef.current.takePictureAsync(options); // RNCamera method to take picture

        const barcodes: any = await vision().barcodeDetectorProcessImage(uri); // mlkit barcode reading function

        if (barcodes.length) {
          // checking to ensure that something return from firebase scan
          console.log('bar', barcodes);
          dispatch(barcodeApiCalls(barcodes[0].rawValue)); // redux action to searching product based on barcode
          // setModalVisible(true);
          Toast.showWithGravity(`${title} was scanned`, Toast.LONG, Toast.TOP);
        } else {
          navigation.navigate('Parsed', {
            localUriPath: uri,
          });
        }
      }
    } catch (e) {
      console.warn(e);
    }
  };

  // adding scanned product to item confirmation screen
  // connecting both camera and text recognition redux states together
  // each item in camera product state are added to the text recognition receiptItems
  const constructReceiptObj = () => {
    receipt.scannedProducts = [];
    return camera.products.forEach((product: any) => {
      let obj: any = {
        name: product.name,
        price: '12',
        quantity: 1,
      };

      receipt.scannedProducts.push(obj);
    });
  };

  return (
    <View style={styles.cameraContainer}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={flash}
        autoFocus={RNCamera.Constants.AutoFocus.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        zoom={zoomValue}>
        <Slider
          minimumValue={0}
          maximumValue={1}
          step={0.1}
          value={zoomValue}
          onValueChange={(val: any) => setZoomValue(val)}
          thumbTintColor={colors.primaryColor}
          style={styles.zoom}
        />
        <Icon
          onPress={toggleFlash}
          style={[styles.flash, styles.icon]}
          name="flash"
        />
        <View>
          {/* <View style={styles.iconView}> */}
          <Icon
            name="camera"
            size={3}
            color="#900"
            style={[styles.icon, styles.camera]}
            onPress={takePicture}
          />
          {/* </View> */}
          {camera.products.length ? (
            <Icon
              name="check-square"
              size={3}
              color="#900"
              style={[styles.icon, styles.button]}
              onPress={() => {
                flash === RNCamera.Constants.FlashMode.torch
                  ? toggleFlash()
                  : null;

                modalVisible // checking the parent component
                  ? constructReceiptObj()
                  : navigation.navigate('Shopping Cart');
              }}
            />
          ) : null}
        </View>
        <View />
      </RNCamera>
    </View>
  );
};
export default Camera;
