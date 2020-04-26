import React, { useState } from 'react';
import {
  Button,
  StatusBar,
  Alert,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Picture, ProgressBar, styling } from './styles.ts';
import { FireBaseStorage } from '../../firebase/firebase';
// import TextRecog from './TextRecog'

export interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const ImageUpload = ({ navigation }: Props) => {
  const [firebaseImgUrl, setFirebaseImgUrl] = useState('');
  const [imageURI, setImageURI] = useState({ uri: false, localPath: '' });
  const [upload, setUpload] = useState({
    loading: false,
    progress: 0,
  });

  console.log('fire url', firebaseImgUrl);

  const imagePickerOptions = { noData: true };

  const getFileLocalPath = (res) => {
    const { path, uri } = res;
    return Platform.OS === 'android' ? path : uri;
  };

  const uploadToFireBase = (imgPickerRes) => {
    const fileSrc = getFileLocalPath(imgPickerRes);
    const storageRef = FireBaseStorage.ref(imgPickerRes.fileName);
    return storageRef.putFile(fileSrc);
  };

  const uploadImage = async (uploadTask) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        console.log(`Uploading progress: `, `${progress}%`);
        setUpload({ loading: true, progress });
      },
      (error) => {
        console.log(error);
      },
      (completed) => {
        console.log(`Upload Completed`);
        completed.ref.getDownloadURL().then(async (url) => {
          console.log(`Firebase Hosted Url`, url);
          try {
            const { data } = await axios.post(
              'http://localhost:8282/receipts/upload',
              {
                url,
              },
            );
            console.log(`Posted to backend successfully`, data);
          } catch (err) {
            console.log(`Post to backedn error`, err);
          }
          setFirebaseImgUrl(url);
        });
      },
    );
  };

  const uploadFile = () => {
    ImagePicker.launchImageLibrary(imagePickerOptions, async (res) => {
      if (res.didCancel) {
        Alert.alert(`Cancelled`);
      } else if (res.error) {
        Alert.alert(`Error: `, res.error);
      } else {
        res.fileName = res.fileName ? res.fileName : 'Test';
        const fileLocalPath = getFileLocalPath(res);
        // console.log(`File details: `, res);
        // console.log(`File Path: `, getFileLocalPath(res));
        // console.log(`File Stored at: `, FireBaseStorage.ref(res.fileName))
        setImageURI({
          uri: res.uri,
          localPath: fileLocalPath,
        });
        const firebaseRes = uploadToFireBase(res);
        uploadImage(firebaseRes);
      }
    });
  };

  return (
    <Container>
      {/* {Alert.alert(JSON.stringify(FireBaseStorage))} */}
      <StatusBar barStyle="dark-content" />
      {!imageURI.uri ? (
        <View>
          <Text style={styling.uploadYourReceipt}>Upload Your Receipt</Text>
          <TouchableOpacity style={styling.button} onPress={uploadFile}>
            <Icon name="plus" style={styling.icon} />
          </TouchableOpacity>
        </View>
      ) : null}
      {imageURI.uri && (
        <View>
          <Picture source={imageURI} />
          <Button
            title="Choose Another Photo"
            onPress={uploadFile}
            color="green"
          />
          {upload.progress === 100 ? (
            // <Button
            //   title="Parse Text"
            //   onPress={() =>
            //     navigation.navigate('Confirmation', {
            //       localUriPath: imageURI.localPath,
            //     })
            //   }
            // />
            // ) :
            <Button
              title="Parse Text"
              onPress={() =>
                navigation.navigate('Parsed', {
                  localUriPath: imageURI.localPath,
                })
              }
            />
          ) : null}
        </View>
      )}
      {upload.loading && <ProgressBar bar={upload.progress} />}
      {/* {imageURI.localPath ? (
        <TextRecog localUriPath={imageURI.localPath} />
      ) : null} */}
    </Container>
  );
};

ImageUpload.navigationOptions = ({ navigation }) => ({
  title: 'Upload',
  // headerShown: false,
});

export default ImageUpload;
