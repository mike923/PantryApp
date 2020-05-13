import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ApiTester from '../testComp/ApiTester.tsx';
import ImageUpload from '../Upload/ImageUpload.tsx';
import Reciepts from '../Reciepts/Reciepts.tsx';
import TextRecog from '../Upload/TextRecog.tsx';
import Upload from '../Upload/Upload.tsx';
import ItemConfirmation from '../Upload/ItemConfirmation.tsx';
import { screenOptions } from './style.ts';
import Camera from '../Camera/cameraScreen.tsx';
import ShopCart from '../ShoppingCart/ShopCart';

const Stack = createStackNavigator();

const UploadStack = ({ navigation }) => {
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
      <Stack.Screen name="Api" component={ApiTester} />
      <Stack.Screen name="Reciepts" component={Reciepts} />
      <Stack.Screen name="Confirmation" component={ItemConfirmation} />
      <Stack.Screen name="ShoppingCart" component={ShopCart} />
      <Stack.Screen name="Parsed" component={TextRecog} />
    </Stack.Navigator>
  );
};

export default UploadStack;
