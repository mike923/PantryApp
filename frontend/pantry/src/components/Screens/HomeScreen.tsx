import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import Home from '../Home/Home';
import User from '../User/User';
import Test from '../testComp/TestComp';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  if (initializing) return null;

  if (!user) return navigation.navigate('Login');

  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="User" component={User} />
      <Stack.Screen name="Test" component={Test} />
    </Stack.Navigator>
  );
};

export default HomeScreen;
