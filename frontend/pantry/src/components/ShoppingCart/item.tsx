import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { cartStyles } from './cartStyles.ts';

const Item = (props: any) => {
  // item display component which takes in the details of the item to print to the screen
  return (
    <View>
      <TouchableOpacity
        onPress={() => props.onSelect(props.id)}
        style={[
          cartStyles.item,
          { backgroundColor: props.selected ? '#6e3b6e' : '#f9c2ff' },
        ]}>
        <View style={cartStyles.itemContainer}>
          <View style={cartStyles.imageContainer}>
            <Image
              source={{
                uri:
                  props.img ||
                  'https://cdn0.iconfinder.com/data/icons/ecommerce-57/100/Ecommerce_RTE-03-512.png',
              }}
              style={cartStyles.image}
            />
          </View>
          <View style={cartStyles.itemInfo}>
            <Text style={cartStyles.title}>{props.title}</Text>
            <Text style={cartStyles.price}>${props.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Item;
