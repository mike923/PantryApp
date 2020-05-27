import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screenOptions } from './style.ts';
import ShopCart from '../ShoppingCart/ShopCart.tsx';

const Stack = createStackNavigator();

const ShopCartStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
      }}>
      <Stack.Screen name="Cart" component={ShopCart} />
    </Stack.Navigator>
  );
};

export default ShopCartStack;
