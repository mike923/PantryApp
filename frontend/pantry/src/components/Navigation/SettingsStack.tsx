import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { screenOptions } from './style.ts';

const Stack = createStackNavigator();

const Settings = () => (
  <View>
    <Text>This will be the main settings page in the stack</Text>
  </View>
);

const SettingsStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
      }}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
