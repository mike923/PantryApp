import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { emptyCart } from './cartStyles.ts';

import ShoppingCartImage from '../../../assets/images/shopping-cart-colour.svg';

const EmptyCart = ({ navigation }: any) => {
  const navigateToCamera = () => {
    console.log('eagrhaetr');

    navigation.navigate('Camera', { fromCart: true });
  };
  return (
    <View style={emptyCart.emptyCartContainer}>
      <ShoppingCartImage style={emptyCart.svgImg} />
      <Text style={emptyCart.primaryText}>Your cart is empty</Text>
      <Text style={emptyCart.secondaryText}>Start Scanning</Text>
      <TouchableOpacity
        style={emptyCart.cameraLaunchButton}
        onPress={navigateToCamera}>
        <Text style={emptyCart.cameraLaunchButtonText}>Launch Camera</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyCart;
