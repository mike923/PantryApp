import React from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { productStyles } from './shoppingListStyles.ts';

const RenderText = ({
  name,
  quant,
  setName,
  setQuantity,
  editable,
  keyVal,
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
    <View style={productStyles.productInfo} key={keyVal}>
      {editable ? (
        <TextInput
          style={[productStyles.item, productStyles.quantTxtInput]}
          value={`${quant}`}
          onChangeText={(text: any) => handleChange('quantity', text)}
          onSubmitEditing={() => {
            console.log('edit');
          }}
        />
      ) : (
        <Text style={[productStyles.item, productStyles.quantity]}>
          {quant}
        </Text>
      )}
      {editable ? (
        <TextInput
          style={[productStyles.item, productStyles.nameTxtInput]}
          value={name}
          onChangeText={(text: string) => handleChange('name', text)}
          onSubmitEditing={() => {
            console.log('edit');
          }}
        />
      ) : (
        <Text style={[productStyles.item, productStyles.itemNameTxt]}>
          {name}
        </Text>
      )}
    </View>
  );
};

export default RenderText;
