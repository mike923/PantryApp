import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { emptyCart } from './cartStyles.ts';

import ShoppingCartImage from '../../../assets/images/shopping-cart-colour.svg';

const EmptyCart = ({ navigation }: any) => {
  const navigateToCamera = () => {
    console.log('eagrhaetr');

    navigation.navigate('Camera', { fromCart: true });
  };
  return (
    <View style={style.emptyCartContainer}>
      <ShoppingCartImage style={style.svgImg} />
      <View style={style.innerContainer}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={style.primaryText}>
            Your cart is empty{'\n'}Start Scanning
          </Text>
          {/* <Text style={style.secondaryText}>Start Scanning</Text> */}
        </View>
        <View style={{ flex: 1, justifyContent: 'center' }} />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <TouchableOpacity
            style={style.cameraLaunchButton}
            onPress={navigateToCamera}>
            <Text style={style.cameraLaunchButtonText}>Launch Camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  cameraLaunchButton: {
    alignItems: 'center',
    backgroundColor: '#ff5c61',
    borderRadius: 50,
    marginVertical: 10,
    padding: 20,
    width: '65%',
  },
  cameraLaunchButtonText: {
    color: '#fff',
    fontFamily: 'DINPro',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyCartContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  primaryText: {
    color: 'black',
    fontSize: 44,
    textAlign: 'center',
  },
  svgImg: {
    flex: 0,
    height: '90%',
    position: 'absolute',
    width: '90%',
  },
});

export default EmptyCart;
