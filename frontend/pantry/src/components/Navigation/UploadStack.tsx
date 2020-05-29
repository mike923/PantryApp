import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ApiTester from '../testComp/ApiTester.tsx';
import ImageUpload from '../Upload/ImageUpload.tsx';
import Receipts from '../Receipts/Receipts.tsx';
import TextRecog from '../Upload/TextRecog.tsx';
import Upload from '../Upload/Upload.tsx';
import ItemConfirmation from '../Upload/ItemConfirmation.tsx';
import { screenOptions } from './style.ts';
import Camera from '../Camera/cameraScreen.tsx';
import ShopCart from '../ShoppingCart/ShopCart.tsx';

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
      <Stack.Screen name="Receipts" component={Receipts} />
      <Stack.Screen name="Confirmation" component={ItemConfirmation} />
      <Stack.Screen name="Cart" component={ShopCart} />
      <Stack.Screen name="Parsed" component={TextRecog} />
    </Stack.Navigator>
  );
};

export default UploadStack;
