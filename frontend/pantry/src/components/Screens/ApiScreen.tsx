import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home/Home';
import User from '../User/User';
import ApiTester from '../testComp/ApiTester';

const Stack = createStackNavigator();

const ApiScreen = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Api" component={ApiTester} />
    </Stack.Navigator>
  );
};

export default ApiScreen;
