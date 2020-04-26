import React, { Component } from 'react';
import { Text, View, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Slider, Overlay } from 'react-native-elements';
import { Spinner } from 'native-base';
import RNTextDetector from 'react-native-text-detector';
import Icon from 'react-native-vector-icons/FontAwesome';

import { styles } from './cameraStyles.ts';
import colors from './colors.ts';

class Camera extends Component {
  static navigationOptions = {
    header: null,
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.barcodes = new Set();

    this.state = {
      zoomValue: 0,
      flashMode: RNCamera.Constants.FlashMode.off,
    };
  }

  flash = () => {
    if (this.state.flashMode === RNCamera.Constants.FlashMode.off) {
      this.setState({ flashMode: RNCamera.Constants.FlashMode.torch });
    } else this.setState({ flashMode: RNCamera.Constants.FlashMode.off });
  };

  takePicture = async () => {
    try {
      const options = {
        quality: 0.8,
        base64: true,
        skipProcessing: true,
      };
      const { uri } = await this.camera.takePictureAsync(options);
      console.log('uri', uri);
      const visionResp = await RNTextDetector.detectFromUri(uri);
      console.log('visionResp', visionResp);
      this.props.navigation.navigate('Display', {
        res: visionResp,
      });
    } catch (e) {
      console.warn(e);
    }
  };

  onBarCodeRead = (scanResult) => {
    if (scanResult.data !== null) {
      if (!this.barcodes.has(scanResult.data)) {
        this.barcodes.add(scanResult.data);
        console.log('onBarCodeRead call', this.barcodes);
      }
    }
  };

  render() {
    console.log(this.barcodes);

    return (
      <View style={styles.cameraContainer}>
        <RNCamera
          onBarCodeRead={this.onBarCodeRead}
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={this.state.flashMode}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          zoom={this.state.zoomValue}>
          <Overlay
            isVisible={false}
            overlayBackgroundColor="white"
            width="75%"
            height="25%">
            <View>
              <Spinner color={colors.primaryColor} />
              <Text
                style={{ alignSelf: 'center', fontSize: 20, color: 'black' }}>
                Processing...
              </Text>
            </View>
          </Overlay>

          <View
            style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
            <View
              style={{
                flex: 1,
                alignItems: 'stretch',
                justifyContent: 'center',
                // flexDirection: 'row',
              }}>
              <Slider
                minimumValue={0}
                maximumValue={1}
                step={0.1}
                value={this.state.zoomValue}
                onValueChange={(zoomValue) => this.setState({ zoomValue })}
                thumbTintColor={colors.primaryColor}
                style={styles.zoom}
              />
              <Icon
                name="camera"
                size={2}
                color="#900"
                style={[styles.icon, styles.camera]}
                onPress={this.takePicture}
              />
            </View>
            <Icon
              type="Entypo"
              onPress={this.flash}
              style={[styles.flash, styles.icon]}
              name="flash"
            />
          </View>
        </RNCamera>
      </View>
    );
  }
}
export default Camera;
