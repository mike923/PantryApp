import React from 'react';
import { View, TextInput } from 'react-native';
import { confirmStyles as styles } from './styles.ts';

interface Props {
  name: string;
  price: number;
  quantity: number;
}

const Item = ({ name, price, quantity }: Props) => {
  return (
    <View style={styles.quantityBoxRow}>
      <View style={styles.quantityBox}>
        <TextInput style={styles.quantityText} value={`${quantity}`} />
      </View>
      <View style={styles.nameBox}>
        <TextInput style={styles.nameText} value={name} />
      </View>
      <View style={styles.priceBox}>
        <TextInput style={styles.priceText} value={`${price}`} />
      </View>
    </View>
  );
};

export default Item;
