import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { View, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'; // Navigation wrapper for App

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import Buttons from '../Style/Button';

import styles from './styles';
import HomeScreen from '../Screens/Welcome';
import UserScreen from '../Screens/UserScreen';
import ApiScreen from '../Screens/ApiScreen';
const Tab = createBottomTabNavigator();
export interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Home = ({ navigation }: Props) => {
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

  const navigateToUsers = () => navigation.navigate('User');
  const navigateToTestComp = () => navigation.navigate('Test');

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="User" component={UserScreen} />
          <Tab.Screen name="API" component={ApiScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

Home.navigationOptions = ({ navigation }) => ({
  title: 'Home',
});

export default Home;
