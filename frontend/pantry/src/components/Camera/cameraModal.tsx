import React, { useState, useEffect } from 'react';
import {
  Text,
  Image,
  Alert,
  Modal,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { styles, colors } from './cameraStyles.ts';

const CameraModal = ({ modalVisible, setModalVisible }) => {
  const camera: object = useSelector((state) => state.camera);
  const [title, setTitle] = useState('');
  const [img, setImg] = useState(
    'https://www.transparenttextures.com/patterns/asfalt-light.png',
  );
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (camera.products.length) {
      let last: number = camera.products.length - 1;
      setTitle(camera.products[last].title);
      setImg(camera.products[last].images[1]);
      setDescription(camera.products[last].description);
    }
  }, [camera]);

  console.log('tittle', img);

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has now been closed.');
      }}>
      <Text style={styles.productTitle}>{title}</Text>
      <Image style={styles.modalImg} source={{ uri: img }} />
      <SafeAreaView>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.description}>{description}</Text>
        </ScrollView>
      </SafeAreaView>
      <Text
        style={styles.closeText}
        onPress={() => {
          setModalVisible(!modalVisible);
        }}>
        Close
      </Text>
    </Modal>
  );
};

export default CameraModal;
