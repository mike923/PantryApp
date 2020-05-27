import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { productStyles } from './shoppingListStyles.ts';

const Product = ({ keyVal, item, setItemToComplete }: any) => {
  return (
    <View key={keyVal} style={productStyles.product}>
      <View>
        <Text style={productStyles.productInfo}>{item.product}</Text>
        <Text style={productStyles.productInfo}>{item.quantity}</Text>
      </View>

      <TouchableOpacity
        onPress={() => setItemToComplete(keyVal)}
        style={productStyles.deleteBtn}>
        <Text style={productStyles.deleteBtnText}>delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Product;
