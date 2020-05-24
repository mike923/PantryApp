import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { screenOptions } from './style.ts';
import ShoppingList from '../ShoppinList/ShoppingList.tsx';

const Stack = createStackNavigator();

const ShoppingListStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
      }}>
      <Stack.Screen name="Shopping List" component={ShoppingList} />
    </Stack.Navigator>
  );
};

export default ShoppingListStack;
