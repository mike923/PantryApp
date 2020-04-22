import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { PantryView } from '../Pantry/index.ts';
import { screenOptions } from './style.ts';

const Stack = createStackNavigator();

const SettingsStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
      }}>
      <Stack.Screen name="Pantry" component={PantryView} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
