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
      {editableName ? (
        <TextInput
          style={productStyles.item}
          value={name}
          onChangeText={(text) => handleChange('name', text)}
          onSubmitEditing={() => {
            console.log('edit');
          }}
        />
      ) : (
        <TouchableOpacity
          style={productStyles.item}
          onPress={() => {
            setEditableName(!editableName);
          }}>
          <Text>{name}</Text>
        </TouchableOpacity>
      )}

      {editableQuant ? (
        <TextInput
          style={productStyles.item}
          value={`${quant}`}
          onChangeText={(text) => handleChange('quantity', text)}
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
          <Text>{quant}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RenderText;
