import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { cartStyles } from './cartStyles.ts';

const Item = ({ id, title, selected, onSelect, price }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => onSelect(id)}
        style={[
          cartStyles.item,
          { backgroundColor: selected ? '#6e3b6e' : '#f9c2ff' },
        ]}>
        <View>
          <Text style={cartStyles.title}>{title}</Text>
          <Text style={cartStyles.price}>${price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Item;
