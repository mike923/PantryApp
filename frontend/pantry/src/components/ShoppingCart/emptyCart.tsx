import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { emptyCart } from './cartStyles.ts';

const EmptyCart = (props: any) => {
  return (
    <View style={emptyCart.emptyCartContainer}>
      <Text style={emptyCart.text}>Start Scanning</Text>
      <TouchableOpacity style={emptyCart.cameraLaunchButton}>
        <Text>Launch Camera</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyCart;
