import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

import TabBarNavigator from '../Navigation/TabBarNavigator.tsx';

export interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Home = ({ navigation }: Props) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (updatedUser) => {
    setUser(updatedUser);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  if (initializing) return null;
  if (!user) return navigation.navigate('Login');
  return <TabBarNavigator />;
};

Home.navigationOptions = ({ navigation }) => ({
  title: 'Home',
  headerShown: false,
});

export default Home;
