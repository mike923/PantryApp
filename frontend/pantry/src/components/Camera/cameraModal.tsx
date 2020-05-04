import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import Modal, { ModalTitle, ModalContent } from 'react-native-modals';
import { useSelector } from 'react-redux';
import { styles, colors } from './cameraStyles.ts';

const CameraModal = ({ bottomModalAndTitle, setBottomModalAndTitle }) => {
  const camera: object = useSelector((state) => state.camera);
  const [title, setTitle] = useState('');
  const [img, setImg] = useState(
    'https://www.transparenttextures.com/patterns/asfalt-light.png',
  );

  useEffect(() => {
    if (camera.products.length) {
      let last: number = camera.products.length - 1;
      setTitle(camera.products[last].title);
      setImg(camera.products[last].images[1]);
    }
  }, [camera]);

  console.log('tittle', img);

  return (
    <View>
      <Modal.BottomModal
        visible={bottomModalAndTitle}
        onTouchOutside={() => setBottomModalAndTitle(false)}
        height={0.5}
        width={1}
        onSwipeOut={() => setBottomModalAndTitle(false)}
        modalTitle={<ModalTitle title={title} hasTitleBar />}>
        <ModalContent
          style={{
            flex: 1,
            backgroundColor: 'fff',
          }}>
          <View>
            {img.length ? (
              <Image style={styles.modalImg} source={{ uri: img }} />
            ) : null}
          </View>
          <Text>Bottom Modal with Title</Text>
        </ModalContent>
      </Modal.BottomModal>
    </View>
  );
};

export default CameraModal;
