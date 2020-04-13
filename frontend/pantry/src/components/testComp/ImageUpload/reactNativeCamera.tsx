import React, { Component } from 'react';
import { TouchableOpacity, View, ImageBackground } from 'react-native';
import { RNCamera as Camera } from 'react-native-camera';
import RNTextDetector from 'react-native-text-detector';

import style, { screenHeight, screenWidth } from './cameraStyles';

const PICTURE_OPTIONS = {
  quality: 1,
  fixOrientation: true,
  forceUpOrientation: true,
};

export default class CameraTest extends Component {
  state = {
    loading: false,
    image: null,
    error: null,
    visionResp: [],
  };

  reset(error = 'OTHER') {
    this.setState({
      loading: false,
      image: null,
      error,
    });
  }

  takePicture = async (camera) => {
    this.setState({
      loading: true,
    });
    try {
      const data = await camera.takePictureAsync(PICTURE_OPTIONS);
      if (!data.uri) {
        throw 'OTHER';
      }
      this.setState(
        {
          image: data.uri,
        },
        () => {
          console.log(data.uri);
          this.processImage(data.uri, {
            height: data.height,
            width: data.width,
          });
        },
      );
    } catch (e) {
      console.warn(e);
      this.reset(e);
    }
  };

  processImage = async (uri, imageProperties) => {
    const visionResp = await RNTextDetector.detectFromUri(uri);
    console.log(visionResp);
    if (!(visionResp && visionResp.length > 0)) {
      throw 'UNMATCHED';
    }
    this.setState({
      visionResp: this.mapVisionRespToScreen(visionResp, imageProperties),
    });
  };

  mapVisionRespToScreen = (visionResp, imageProperties) => {
    const IMAGE_TO_SCREEN_Y = screenHeight / imageProperties.height;
    const IMAGE_TO_SCREEN_X = screenWidth / imageProperties.width;

    return visionResp.map((item) => {
      return {
        ...item,
        position: {
          width: item.bounding.width * IMAGE_TO_SCREEN_X,
          left: item.bounding.left * IMAGE_TO_SCREEN_X,
          height: item.bounding.height * IMAGE_TO_SCREEN_Y,
          top: item.bounding.top * IMAGE_TO_SCREEN_Y,
        },
      };
    });
  };

  render() {
    return (
      <View style={style.screen}>
        {!this.state.image ? (
          <Camera
            ref={(cam) => {
              this.camera = cam;
            }}
            key="camera"
            style={style.camera}
            notAuthorizedView={null}
            playSoundOnCapture>
            {({ camera, status }) => {
              if (status !== 'READY') {
                return null;
              }
              return (
                <View style={style.buttonContainer}>
                  <TouchableOpacity
                    onPress={() => this.takePicture(camera)}
                    style={style.button}
                  />
                </View>
              );
            }}
          </Camera>
        ) : null}
        {this.state.image ? (
          <ImageBackground
            source={{ uri: this.state.image }}
            style={style.imageBackground}
            key="image"
            resizeMode="cover">
            {this.state.visionResp.map((item) => {
              return (
                <TouchableOpacity
                  style={[style.boundingRect, item.position]}
                  key={item.text}
                />
              );
            })}
          </ImageBackground>
        ) : null}
      </View>
    );
  }
}
