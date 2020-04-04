import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home/Home';
import User from '../User/User'

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="User" component={User} />
      </Stack.Navigator>
  );
};

export default HomeScreen;
