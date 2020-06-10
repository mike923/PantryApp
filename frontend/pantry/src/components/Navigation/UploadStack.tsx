import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  ImageUpload,
  FoodItemForm,
  TestCam,
  TextRecog,
  Upload,
} from '../Upload/index.ts';
import { screenOptions } from './style.ts';
import Camera from '../Camera/cameraScreen.tsx';

const Stack = createStackNavigator();

const UploadStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
      }}>
      <Stack.Screen name="Upload" component={Upload} />
      <Stack.Screen
        name="Camera"
        component={Camera}
        headerMode="screen"
        headerShown="false"
        options={{
          headerMode: 'none',
          headerShown: false,
        }}
      />
      <Stack.Screen name="ImageUpload" component={ImageUpload} />
      <Stack.Screen name="FoodItemForm" component={FoodItemForm} />
      <Stack.Screen name="TestCam" component={TestCam} />
      <Stack.Screen name="Parsed" component={TextRecog} />
    </Stack.Navigator>
  );
};

export default UploadStack;
