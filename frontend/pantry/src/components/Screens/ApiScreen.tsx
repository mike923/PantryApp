import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ApiTester from '../testComp/ApiTester.tsx';
import ImageUpload from '../testComp/ImageUpload/ImageUpload.tsx';
import Reciepts from '../Reciepts/Reciepts.tsx';

const Stack = createStackNavigator();

const ApiScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Api" component={ApiTester} />
      <Stack.Screen name="ImageUpload" component={ImageUpload} />
      <Stack.Screen name="Reciepts" component={Reciepts} />
    </Stack.Navigator>
  );
};

export default ApiScreen;
