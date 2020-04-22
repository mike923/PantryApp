import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { confirmStyles as styles } from './styles.ts';

interface Props {
  name: string;
  value: string;
  price: number;
  quantity: number;
  handleChange: any;
}

const Item = ({ name, value, price, quantity, handleChange }: Props) => {
  return (
    <View style={styles.quantityBoxRow}>
      <View style={styles.quantityBox}>
        <TextInput
          style={styles.quantityText}
          value={`${quantity}`}
          onChangeText={(text) => handleChange(name, 'quantity', text)}
        />
      </View>
      <View style={styles.nameBox}>
        <TextInput
          style={styles.nameText}
          value={value}
          onChangeText={(text) => handleChange(name, 'name', text)}
        />
      </View>
      <View style={styles.priceBox}>
        <Text style={styles.priceText}>$</Text>
        <TextInput
          style={styles.priceText}
          value={`${price}`}
          onChangeText={(text) => handleChange(name, 'price', text)}
        />
      </View>
    </View>
  );
};

export default Item;
