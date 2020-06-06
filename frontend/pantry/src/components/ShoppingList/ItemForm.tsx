import React from 'react';
import { Modal, Text, TouchableHighlight, View, TextInput } from 'react-native';
import { itemFormStyles, shoppingListStyles } from './shoppingListStyles.ts';

const ItemForm = ({
  addItem,
  setAddItem,
  itemName,
  setItemName,
  quantity,
  setQuantity,
  handleSubmit,
}: any) => {
  return (
    <View style={itemFormStyles.centeredView}>
      <Modal animationType="slide" transparent visible={addItem}>
        <View style={itemFormStyles.centeredView}>
          <View style={itemFormStyles.modalView}>
            <Text style={itemFormStyles.modalText}>Enter Item Information</Text>

            <View style={shoppingListStyles.footer}>
              <TextInput
                style={shoppingListStyles.textInput}
                placeholder="Item Name"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                onChangeText={(text) => setItemName(text)}
                value={itemName}
              />
              <TextInput
                style={shoppingListStyles.textInput}
                placeholder="Quantity"
                placeholderTextColor="white"
                underlineColorAndroid="transparent"
                onChangeText={(num) => setQuantity(num)}
                keyboardType="numeric"
                value={quantity}
              />
            </View>

            <TouchableHighlight
              style={{
                ...itemFormStyles.closeButton,
              }}
              onPress={() => {
                setAddItem(!addItem);
              }}>
              <Text style={itemFormStyles.textStyle}>X</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={{
                ...itemFormStyles.submitButton,
              }}
              onPress={() => {
                setAddItem(!addItem);
                handleSubmit();
              }}>
              <Text style={itemFormStyles.textStyle}>Submit</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ItemForm;
