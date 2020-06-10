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
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Picture, ProgressBar, styling } from './styles.ts';
import { FireBaseStorage } from '../../firebase/firebase';
// import { client } from '../../../proxy';
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

  const getFileLocalPath = (res) => {
    const { path, uri } = res;
    return Platform.OS === 'android' ? path : uri;
  };

  const uploadToFireBase = (imgPickerRes) => {
    const fileSrc = getFileLocalPath(imgPickerRes);
    console.log('asdfasdfasd', fileSrc);
    const storageRef = FireBaseStorage.ref(imgPickerRes.fileName);
    return storageRef.putFile(fileSrc);
  };

  const uploadImage = (uploadTask) => {
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
        completed.ref.getDownloadURL().then((url) => {
          console.log(`Firebase Hosted Url`, url);
          setFirebaseImgUrl(url);
        });
      },
    );
  };

  const uploadFile = () => {
    ImagePicker.launchImageLibrary({ noData: true }, async (res) => {
      if (res.didCancel) {
        Alert.alert(`Cancelled`);
      } else if (res.error) {
        Alert.alert(`Error: `, res.error);
      } else {
        console.log(res.fileName, res);
        res.fileName = res.fileName ? res.fileName : 'Test';
        const fileLocalPath = getFileLocalPath(res);
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
      <StatusBar barStyle="dark-content" />
      {!imageURI.uri ? (
        <View>
          <Text style={styling.uploadYourReceipt}>Upload Your Receipt</Text>
          <Text style={styling.uploadYourReceipt}>
            Still Under Construction
          </Text>
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
            <Button
              title="Parse Text"
              onPress={() =>
                navigation.navigate('Parsed', {
                  localUriPath: imageURI.localPath,
                  firebaseImageURL: firebaseImgUrl,
                })
              }
            />
          ) : null}
        </View>
      )}
      {upload.loading && <ProgressBar bar={upload.progress} />}
    </Container>
  );
};

export default ImageUpload;
