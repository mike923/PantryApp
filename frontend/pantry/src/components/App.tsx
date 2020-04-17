import React, {useState} from 'react';
import 'react-native-gesture-handler'; // Requred for @react-navigation
import { NavigationContainer } from '@react-navigation/native'; // Navigation wrapper for App
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import store from '../redux/store';
import { Provider } from 'react-redux';

// Import Component Screens
import HomeScreen from './Screens/Welcome';
import UserScreen from './Screens/UserScreen';
import ApiScreen from './Screens/ApiScreen';
// import TestScreen from './Screens/TestScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  const [show, setshow] = useState(false)
  return (
    <Provider store={store}>
      <NavigationContainer>
        {!show ?
          (<HomeScreen/>) 
          : (<Tab.Navigator>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="User" component={UserScreen} />
          <Tab.Screen name="API" component={ApiScreen} />
        </Tab.Navigator>)}
      </NavigationContainer>
    </Provider>
  );
};

export default App;
