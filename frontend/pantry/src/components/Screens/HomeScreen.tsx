import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home/Home';
import User from '../User/User';
import Test from '../testComp/TestComp';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  );
};

export default HomeScreen;
