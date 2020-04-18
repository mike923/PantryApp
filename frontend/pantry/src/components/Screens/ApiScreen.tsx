import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ApiTester from '../testComp/ApiTester.tsx';
import ImageUpload from '../Upload/ImageUpload.tsx';
import Reciepts from '../Reciepts/Reciepts.tsx';
import TextRecog from '../Upload/TextRecog.tsx';

const Stack = createStackNavigator();

const ApiScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Api" component={ApiTester} />
      <Stack.Screen name="ImageUpload" component={ImageUpload} />
      <Stack.Screen name="Reciepts" component={Reciepts} />
      <Stack.Screen name="Parsed" component={TextRecog} />
    </Stack.Navigator>
  );
};

export default ApiScreen;
