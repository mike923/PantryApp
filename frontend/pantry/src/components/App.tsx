import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler'; // Requred for @react-navigation
import { NavigationContainer } from '@react-navigation/native'; // Navigation wrapper for App
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Provider } from 'react-redux';
import store from '../redux/store.ts';

// Import Component Screens
import HomeScreen from './Screens/Welcome.tsx';
import UserScreen from './Screens/UserScreen.tsx';
import ApiScreen from './Screens/ApiScreen.tsx';
// import TestScreen from './Screens/TestScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  const [show, setshow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setshow(true);
    }, 3000);
  }, [show]);
  return (
    <Provider store={store}>
      <NavigationContainer>
        {!show ? (
          <HomeScreen />
        ) : (
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="User" component={UserScreen} />
            <Tab.Screen name="API" component={ApiScreen} />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
