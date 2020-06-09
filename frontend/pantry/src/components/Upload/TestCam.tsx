import React, { useState } from 'react';
import { RNCamera } from 'react-native-camera';
import {
  Dimensions,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { ActionSheet, Root } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import FeatherIcons from 'react-native-vector-icons/Feather';

const TestCam = () => {
  const [uploadImage, setUploadImage] = useState(false);

  const setImage = (image) =>
    setUploadImage({
      id: Date.now(),
      url: {
        uri: image.path,
      },
      content: image.data,
    });

  const addImage = () => {
    const imageOptions = { width: 300, height: 300, cropping: true };
    let buttons = ['Take Photo', 'Choose Photo', 'Cancel'];
    if (uploadImage) buttons.splice(2, 0, 'Remove Photo');

    ActionSheet.show(
      {
        options: buttons,
        cancelButtonIndex: uploadImage ? 3 : 2,
        title: 'Select a Photo',
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            ImagePicker.openCamera(imageOptions).then((img) => setImage(img));
            break;
          case 1:
            ImagePicker.openPicker(imageOptions).then((img) => setImage(img));
            break;
          case 2:
            setUploadImage(false);
            break;
          default:
            break;
        }
      },
    );
  };

  return (
    <Root>
      <TouchableOpacity style={style.innerContainer} onPress={addImage}>
        {uploadImage ? (
          <Image source={uploadImage.url} style={style.itemImage} />
        ) : (
          <FeatherIcons name="image" style={style.uploadImageIcon} />
        )}
      </TouchableOpacity>
    </Root>
  );
};

const { width } = Dimensions.get('window');

const style = StyleSheet.create({
  innerContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    aspectRatio: 1,
    backgroundColor: '#ff5c61',
    borderRadius: 25,
    flex: 1,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2.22,
    width: '90%',
  },
  itemImage: {
    backgroundColor: '#2f455c',
    borderRadius: 25,
    height: '100%',
    resizeMode: 'contain',
    width: '100%',
  },
  uploadImageIcon: {
    color: 'white',
    fontSize: width * 0.75,
    marginTop: 5,
  },
});

export default TestCam;
