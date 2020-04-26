import React, { Component, useState, useRef } from 'react';
import { Text, View, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Slider, Overlay } from 'react-native-elements';
import { Spinner } from 'native-base';
import RNTextDetector from 'react-native-text-detector';
import Icon from 'react-native-vector-icons/FontAwesome';

import { styles } from './cameraStyles.ts';
import colors from './colors.ts';

const Camera = ({ navigation }) => {
  let barcodes = new Set();

  const [zoomValue, setZoomValue] = useState(0);
  const [flash, setFlash] = useState(RNCamera.Constants.FlashMode.off);
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
        const visionResp = await RNTextDetector.detectFromUri(uri);
        console.log('visionResp', visionResp);
        navigation.navigate('Display', {
          res: visionResp,
        });
      }
    } catch (e) {
      console.warn(e);
    }
  };

  const onBarCodeRead = (scanResult) => {
    if (scanResult.data !== null) {
      if (!barcodes.has(scanResult.data)) {
        barcodes.add(scanResult.data);
        console.log('onBarCodeRead call', barcodes);
      }
    }
  };

  return (
    <View style={styles.cameraContainer}>
      <RNCamera
        onBarCodeRead={onBarCodeRead}
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
          <View
            style={{
              flex: 1,
              alignItems: 'stretch',
              justifyContent: 'center',
              // flexDirection: 'row',
            }}>
            {/* <Slider
              minimumValue={0}
              maximumValue={1}
              step={0.1}
              value={zoomValue}
              onValueChange={(zoomValue) => setZoomValue({ zoomValue })}
              thumbTintColor={colors.primaryColor}
              style={styles.zoom}
            /> */}
            <Icon
              name="camera"
              size={2}
              color="#900"
              style={[styles.icon, styles.camera]}
              onPress={takePicture}
            />
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
