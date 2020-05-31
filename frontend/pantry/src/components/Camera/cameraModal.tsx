import React, { useState, useEffect } from 'react';
import { Text, Alert, Modal } from 'react-native';
import { styles } from './cameraStyles.ts';
import Camera from './cameraScreen.tsx';

const CameraModal = ({ modalVisible, setModalVisible, navigation }) => {
  return (
    <Modal animationType="slide" transparent={false} visible={modalVisible}>
      <Camera navigation={navigation} modalVisible={modalVisible} />
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
