import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler'; // Requred for @react-navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from 'react-redux';
import { Login } from './auth/Login.tsx';
import { Register } from './auth/Register.tsx';
import Home from './Home/Home.tsx';
import { Reset } from './auth/Reset.tsx';

import store from '../redux/store.ts';

// Import Component Screens
import HomeScreen from './Screens/Welcome.tsx';

const RootStack = createStackNavigator(
  {
    Login,
    Register,
    Home,
    Reset,
  },
  {
    // initialRouteName: 'Login',
    initialRouteName: 'Home',
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
      {/* {!show ? <HomeScreen /> : <RootContainer />} */}
      <RootContainer />
    </Provider>
  );
}
