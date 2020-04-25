import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Slider, Overlay } from 'react-native-elements';
import { Spinner, Icon } from 'native-base';
import RNTextDetector from 'react-native-text-detector';

import colors from './colors.ts';

class Camera extends Component {
  static navigationOptions = {
    header: null,
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = { zoomValue: 0, flashMode: RNCamera.Constants.FlashMode.off };
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
    } catch (e) {
      console.warn(e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
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
              }}>
              <Slider
                minimumValue={0}
                maximumValue={1}
                step={0.1}
                value={this.state.zoomValue}
                onValueChange={(zoomValue) => this.setState({ zoomValue })}
                thumbTintColor={colors.primaryColor}
              />
            </View>

            <Icon
              type="Entypo"
              onPress={this.takePicture}
              style={styles.icon}
              name="flickr-with-circle"
            />

            <Icon
              type="Entypo"
              onPress={this.flash}
              style={styles.icon}
              name="flash"
            />
          </View>
        </RNCamera>
      </View>
    );
  }
}
export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  icon: {
    alignSelf: 'center',
    color: 'white',
    flex: 0,
    fontSize: 40,
    margin: 20,
    padding: 15,
    paddingHorizontal: 20,
  },
  preview: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    height: '100%',
  },
  //   spinnerStyle: {
  //     flex: 0,
  //     backgroundColor: '#fff',
  //     justifyContent: 'center',
  //     flexDirection: 'column',
  //     height: '100%',
  //     width: '100%',
  //     alignSelf: 'flex-start',
  //   },
});
