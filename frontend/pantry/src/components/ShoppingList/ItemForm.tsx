// import React, { useState, useEffect } from 'react';
// import { View, Text, Modal } from 'react-native';
// import { itemFormStyles } from './shoppingListStyles';

// const ItemForm = ({ addItem, setAddItem }: any) => {
//   return (
//     <Modal
//       animationType="slide"
//       transparent={false}
//       visible={addItem}
//       presentationStyle={itemFormStyles.modal}>
//       <Text>Yolo</Text>
//       <Text
//         onPress={() => {
//           setAddItem(!addItem);
//         }}>
//         Close
//       </Text>
//     </Modal>
//   );
// };

import React, { useState } from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  TextInput,
} from 'react-native';
import { itemFormStyles, shoppingListStyles } from './shoppingListStyles.ts';

const ItemForm = ({ addItem, setAddItem, postItem }: any) => {
  return (
    <View style={itemFormStyles.centeredView}>
      <Modal
        animationType="slide"
        transparent
        visible={addItem}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={itemFormStyles.centeredView}>
          <View style={itemFormStyles.modalView}>
            <Text style={itemFormStyles.modalText}>Add Item Information</Text>

            <View style={shoppingListStyles.footer}>
              <TextInput
                style={shoppingListStyles.textInput}
                placeholder="Item"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
              />
            </View>

            <TouchableHighlight
              style={{
                ...itemFormStyles.closeButton,
                backgroundColor: '#2196F3',
              }}
              onPress={() => {
                setAddItem(!addItem);
              }}>
              <Text style={itemFormStyles.textStyle}>X</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ItemForm;
