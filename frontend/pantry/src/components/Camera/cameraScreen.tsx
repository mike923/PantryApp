import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Slider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import vision from '@react-native-firebase/ml-vision';
import { barcodeApiCalls } from '../../redux/actions/cameraActions.ts';
import CameraModal from './cameraModal.tsx';
import Toast from 'react-native-simple-toast';

import { styles, colors } from './cameraStyles.ts';

const Camera = ({ navigation }) => {
  const camera: object = useSelector((state) => state.camera);
  const [title, setTitle] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (camera.products.length) {
      let last: number = camera.products.length - 1;
      setTitle(camera.products[last].title);
      Toast.showWithGravity(`${title} was scanned`, Toast.LONG, Toast.TOP);
    }
  }, [dispatch, camera]);

  const [zoomValue, setZoomValue] = useState(0);
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
  const [modalVisible, setModalVisible] = useState(false);

  // camera functionalities
  let cameraRef = useRef(null);

  const toggleFlash = () => {
    if (flash === RNCamera.Constants.FlashMode.off) {
      setFlash(RNCamera.Constants.FlashMode.torch);
    } else setFlash(RNCamera.Constants.FlashMode.off);
  };

  const takePicture = async () => {
    try {
      if (cameraRef.current) {
        const options = {
          quality: 0.8,
          base64: true,
          skipProcessing: true,
        };
        const { uri } = await cameraRef.current.takePictureAsync(options);

        const barcodes = await vision().barcodeDetectorProcessImage(uri);

        if (barcodes.length) {
          console.log('bar', barcodes);
          dispatch(barcodeApiCalls(barcodes[0].rawValue));
          setModalVisible(true);
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
        <View
          style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <View style={styles.iconView}>
            <Slider
              minimumValue={0}
              maximumValue={1}
              step={0.1}
              value={zoomValue}
              onValueChange={(val) => setZoomValue(val)}
              thumbTintColor={colors.primaryColor}
              style={styles.zoom}
            />

            <Icon
              name="camera"
              size={3}
              color="#900"
              style={[styles.icon, styles.camera]}
              onPress={takePicture}
            />
          </View>
          <Icon
            onPress={toggleFlash}
            style={[styles.flash, styles.icon]}
            name="flash"
          />
        </View>
        <View></View>
        {camera.products.length ? (
          // <CameraModal
          //   modalVisible={modalVisible}
          //   setModalVisible={setModalVisible}
          // />
          <TouchableOpacity style={styles.button}>
            <Text>Done</Text>
          </TouchableOpacity>
        ) : null}
      </RNCamera>
    </View>
  );
};
export default Camera;
