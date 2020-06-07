import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../Settings/Settings.tsx';
import { screenOptions } from './style.ts';

const Stack = createStackNavigator();

const SettingsStack = ({ navigation }: any) => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
      }}>
      <Stack.Screen
        name="Settings"
        component={Settings}
        headerMode="screen"
        headerShown="false"
        options={{
          headerMode: 'none',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
