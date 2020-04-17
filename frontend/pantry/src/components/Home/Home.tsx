import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import Buttons from '../Style/Button';

import styles from './styles';

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
    <View style={styles.container}>
      <Text>Home</Text>
      <Text>Welcome {user.email}</Text>
      <TouchableOpacity onPress={navigateToUsers} style={styles.button}>
        <Text style={styles.buttonText}>Go to Users</Text>
      </TouchableOpacity>
      <Buttons></Buttons>
      <TouchableOpacity onPress={navigateToTestComp} style={styles.button}>
        <Text style={styles.buttonText}>Go to Test Comp</Text>
      </TouchableOpacity>
    </View>
  );
};

Home.navigationOptions = ({ navigation }) => ({
  title: 'Home',
});

export default Home;
