import React, { useEffect, useState, useRef } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Slider } from 'react-native-elements';
import RNTextDetector from 'react-native-text-detector';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';
import { onBarCodeRead } from '../../redux/actions/cameraActions.ts';

import { styles, colors } from './cameraStyles.ts';

const Camera = ({ navigation }) => {
  const camera = useSelector((state) => state.camera);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('hello world');
  }, [dispatch, camera]);

  const [zoomValue, setZoomValue] = useState(0);
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
  const [scanBarcode, setScanBarcode] = useState(false);
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
        console.log('uri', uri);
        // const visionResp = await RNTextDetector.detectFromUri(uri);
        // console.log('visionResp', visionResp);
        navigation.navigate('Parsed', {
          localUriPath: uri,
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const disnBarCodeRead = (scanResult) => {
    dispatch(onBarCodeRead(scanResult.data));
  };

  return (
    <View style={styles.cameraContainer}>
      <RNCamera
        onBarCodeRead={!scanBarcode ? null : disnBarCodeRead}
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
              size={2}
              color="#900"
              style={[styles.icon, styles.camera]}
              onPress={takePicture}
            />
            <TouchableOpacity onPress={() => setScanBarcode(!scanBarcode)}>
              <Text style={{ color: 'white' }}>Scan Barcodes</Text>
            </TouchableOpacity>
          </View>
          <Icon
            type="Entypo"
            onPress={toggleFlash}
            style={[styles.flash, styles.icon]}
            name="flash"
          />
        </View>
      </RNCamera>
    </View>
  );
};
export default Camera;
