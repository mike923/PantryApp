import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { FoodItem, Pantry, PantryView, FoodDetailed } from '../Pantry/index.ts';
import { screenOptions } from './style.ts';

const Stack = createStackNavigator();

const PantryStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
      }}>
      <Stack.Screen name="Pantry" component={Pantry} />
      <Stack.Screen name="Food" component={FoodItem} />
      <Stack.Screen name="PantryView" component={PantryView} />
      <Stack.Screen name="FoodDetailed" component={FoodDetailed} />
    </Stack.Navigator>
  );
};

export default PantryStack;
