import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler'; // Requred for @react-navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import Home from './Home/Home';
import { Reset } from './auth/Reset';

import store from '../redux/store';
import { Provider } from 'react-redux';

// Import Component Screens
import HomeScreen from './Screens/Welcome';

const RootStack = createStackNavigator(
  {
    Login: Login,
    Register: Register,
    Home: Home,
    Reset: Reset,
  },
  {
    initialRouteName: 'Login',
  },
);

const RootContainer = createAppContainer(RootStack);

export default function App() {
  const [show, setshow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setshow(true);
    }, 3000);
  }, [show]);
  return (
    <Provider store={store}>
      {!show ? <HomeScreen /> : <RootContainer />}
    </Provider>
  );
}
