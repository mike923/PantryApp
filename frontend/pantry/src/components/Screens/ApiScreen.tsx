import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ApiTester from '../testComp/ApiTester';
// import ImageUpload from '../testComp/ImageUpload/ImageUpload';
import CameraTest from '../testComp/ImageUpload/reactNativeCamera';
const Stack = createStackNavigator();

const ApiScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Api" component={ApiTester} />
      <Stack.Screen name="ImageUpload" component={CameraTest} />
    </Stack.Navigator>
  );
};

export default ApiScreen;
