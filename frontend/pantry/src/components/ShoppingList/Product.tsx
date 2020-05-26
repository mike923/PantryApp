import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { productStyles } from './shoppingListStyles.ts';

const Product = ({ navigation, keyVal, item, deleteProduct }: any) => {
  return (
    <View key={keyVal} style={productStyles.product}>
      <View>
        <Text style={productStyles.productInfo}>{item.product}</Text>
        <Text style={productStyles.productInfo}>{item.quantity}</Text>
      </View>

      <TouchableOpacity onPress={deleteProduct}>
        <Text style={productStyles.deleteBtn}>delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Product;
