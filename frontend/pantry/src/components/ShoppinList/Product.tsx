import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Product = ({ navigation, keyVal, val, deleteProduct }: any) => {
  //   const navigateToImg = () => navigation.navigate('Pantry');
  //   const navigateToReceipts = () => navigation.navigate('Receipts');
  return (
    <View key={keyVal} style={styles.product}>
      <Text style={styles.productInfo}>{val.date}</Text>
      <Text style={styles.productInfo}>{val.text}</Text>

      <TouchableOpacity onPress={deleteProduct}>
        <Text style={styles.deletBtn}>delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  product: {
    borderBottomColor: '#ededed',
    borderBottomWidth: 2,
    padding: 20,
    paddingRight: 100,
    position: 'relative',
  },
  productInfo: {
    borderLeftColor: 'black',
    borderLeftWidth: 10,
    paddingLeft: 20,
  },
  //   deleteBtn: {
  //     position: 'absolute',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     padding: 10,
  //     top: 10,
  //     bottom: 10,
  //     right: 10,
  //   },
});
