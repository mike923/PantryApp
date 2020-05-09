import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { cartStyles } from './cartStyles.ts';

const Item = ({ id, title, selected, onSelect }) => {
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
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Item;
