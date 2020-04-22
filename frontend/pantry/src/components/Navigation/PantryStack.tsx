import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { FoodItem, Pantry, PantryView } from '../Pantry/index.ts';
import { screenOptions } from './style.ts';

const Stack = createStackNavigator();

const SettingsStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
      }}>
      <Stack.Screen name="Pantry" component={Pantry} />
      <Stack.Screen name="FoodItem" component={FoodItem} />
      <Stack.Screen name="PantryView" component={PantryView} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
