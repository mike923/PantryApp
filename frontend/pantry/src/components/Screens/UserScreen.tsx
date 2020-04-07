import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home/Home';
import User from '../User/User';

const Stack = createStackNavigator();

const UserScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="User" component={User} />
      {/* <Stack.Screen name="Home" component={Home} /> */}
    </Stack.Navigator>
  );
};

export default UserScreen;
