import React, { Fragment } from 'react';
import { RNCamera } from 'react-native-camera';
import styles from './styles';
import {
  TouchableOpacity,
  Text,
  StatusBar,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';
import { Icon } from 'react-native-elements';

const Scan = (props) => {
  const {
    camera,
    cameraResult,
    clickAgain,
    takePicture,
    activeCamera,
    googleVisionDetetion,
    loading,
  } = props;
  const description = `
  Pantry is an app that aims to help individuals reduce the amount of food they waste.
  We allow users to scan their receipt to add their purchases to a virtual pantry.
  `;
  return (
    <View style={styles.scrollViewStyle}>
      {/* View When app starts, here we will dive for camera and vision things */}
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.textTitle}>
          Scan your receipt to add items to your pantry
        </Text>
        {!camera && !cameraResult && (
          <View style={styles.cardView}>
            <Text numberOfLines={8} style={styles.descText}>
              {description}
            </Text>

            <TouchableOpacity
              onPress={activeCamera}
              style={styles.buttonTouchable}>
              <Text style={styles.buttonTextStyle}>Click to Scan !</Text>
            </TouchableOpacity>
          </View>
        )}
        {!googleVisionDetetion && loading && (
          <View style={styles.SpinnerStyle}>
            <ActivityIndicator size={props.size || 'large'} />
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              Wait i am fetching data....
            </Text>
          </View>
        )}
        {/* When Google Vision returns response successfully */}
        {googleVisionDetetion && (
          <Fragment>
            <Text style={styles.textTitle1}>Result !</Text>

            <View
              style={
                googleVisionDetetion ? styles.scanCardView : styles.cardView
              }>
              <ScrollView>
                {googleVisionDetetion.webDetection.webEntities.map(
                  (data, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          borderWidth: 2,
                          borderColor: 'black',
                          margin: 10,
                        }}>
                        <Text>entityId : {data.entityId}</Text>
                        <Text>score : {data.score}</Text>
                        <Text numberOfLines={1}>
                          description: {data.description}
                        </Text>
                      </View>
                    );
                  },
                )}
              </ScrollView>
            </View>

            <TouchableOpacity
              onPress={clickAgain}
              style={styles.buttonTouchable}>
              <Text style={styles.buttonTextStyle}>Click to Scan again!</Text>
            </TouchableOpacity>
          </Fragment>
        )}

        {/* Using react native camera  */}
        {camera && (
          <View style={styles.container}>
            <RNCamera
              ref={(ref) => {
                this.camera = ref;
              }}
              style={styles.preview}
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.off}
              // camera permissions for android
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}

              //using built in react native camera barcode scanner
              onGoogleVisionBarcodesDetected={({ barcodes }) => {
                console.log(barcodes);
              }}
            />
            {/* Button to take picture  */}
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => takePicture(this.camera)}
                style={styles.capture}>
                <Text style={{ fontSize: 14 }}> </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </Fragment>
    </View>
  );
};

export default Scan;
