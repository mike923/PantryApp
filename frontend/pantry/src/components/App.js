import React from 'react';
import 'react-native-gesture-handler'; // Requred for @react-navigation
import { NavigationContainer } from '@react-navigation/native'; // Navigation wrapper for App
import { createStackNavigator } from '@react-navigation/stack'; // Navigation Stack ie: a BrowserRouter
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Import Component Screens
import HomeScreen from './Screens/HomeScreen'
import UserScreen from './Screens/UserScreen'

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="User" component={UserScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
};

export default App;
