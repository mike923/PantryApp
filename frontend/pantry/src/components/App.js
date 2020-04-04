import React from 'react';
import 'react-native-gesture-handler'; // Requred for @react-navigation
import {NavigationContainer} from '@react-navigation/native'; // Navigation wrapper for App
import {createStackNavigator} from '@react-navigation/stack'; // Navigation Stack ie: a BrowserRouter

// Import Components
import Home from './Home/Home';
import User from './User/User'

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={(props) => <Home text="Hello" {...props} />} />
          <Stack.Screen name="User" component={(props) => <User {...props} />} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
