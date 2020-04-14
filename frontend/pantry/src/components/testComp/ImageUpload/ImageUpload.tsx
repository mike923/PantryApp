import React, { useEffect, useState } from 'react';
import { Button, StatusBar, Alert, Platform } from 'react-native';
import { Container, Picture, ProgressBar } from './styles';
import { FireBaseStorage } from '../../../firebase/firebase';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';

import TextRecog from './TextRecog';

const ImageUpload = ({ navigation }) => {
  const [firebaseImgUrl, setFirebaseImgUrl] = useState('');
  const [imageURI, setImageURI] = useState({ uri: false, localPath: '' });
  const [upload, setUpload] = useState({
    loading: false,
    progress: 0,
  });

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
        console.log(`Uploading progress: `, progress + '%');
        setUpload({ loading: true, progress: progress });
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
      <Button title="Choose Photo" onPress={uploadFile} color="green" />
      {imageURI.uri && <Picture source={imageURI} />}
      {upload.loading && <ProgressBar bar={upload.progress} />}
      {imageURI.localPath ? (
        <TextRecog localUriPath={imageURI.localPath} />
      ) : null}
    </Container>
  );
};

export default ImageUpload;
