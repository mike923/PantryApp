import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { productStyles } from './shoppingListStyles.ts';

const RenderText = ({
  name,
  quant,
  setName,
  setQuantity,
  editableName,
  editableQuant,
  setEditableName,
  setEditableQuant,
}: any) => {
  const handleChange = (type: string, val: any) => {
    switch (type) {
      case 'name':
        return setName(val);
      case 'quantity':
        return setQuantity(val);
      default:
        break;
    }
    return val;
  };

  console.log(name, 'names');

  return (
    <View style={productStyles.productInfo}>
      {editableQuant ? (
        <TextInput
          style={[productStyles.item, productStyles.quantTxtInput]}
          value={`${quant}`}
          onChangeText={(text: any) => handleChange('quantity', text)}
          onSubmitEditing={() => {
            console.log('edit');
          }}
        />
      ) : (
        <TouchableOpacity
          style={productStyles.item}
          onPress={() => {
            setEditableQuant(!editableQuant);
          }}>
          <Text style={productStyles.quantity}>{quant}</Text>
        </TouchableOpacity>
      )}
      {editableName ? (
        <TextInput
          style={[productStyles.item, productStyles.nameTxtInput]}
          value={name}
          onChangeText={(text: string) => handleChange('name', text)}
          onSubmitEditing={() => {
            console.log('edit');
          }}
        />
      ) : (
        <TouchableOpacity
          style={[productStyles.item, productStyles.itemNameBtn]}
          onPress={() => {
            setEditableName(!editableName);
          }}>
          <Text style={productStyles.itemNameTxt}>{name}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RenderText;
