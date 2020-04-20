import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import User from '../User/User.tsx';
import TextRecog from '../Upload/TextRecog.tsx';

const Stack = createStackNavigator();

const UserScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="User" component={User} />
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Screen name="Parsed" component={TextRecog} />
    </Stack.Navigator>
  );
};

export default UserScreen;
