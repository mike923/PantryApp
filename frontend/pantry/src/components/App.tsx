import React from 'react';
import 'react-native-gesture-handler'; // Requred for @react-navigation
import { NavigationContainer } from '@react-navigation/native'; // Navigation wrapper for App
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import Home from './Home/Home';
import { Reset } from './auth/Reset';

import store from '../redux/store';
import { Provider } from 'react-redux';

// Import Component Screens
import HomeScreen from './Screens/HomeScreen';
import UserScreen from './Screens/UserScreen';
import ApiScreen from './Screens/ApiScreen';
// import TestScreen from './Screens/TestScreen';

// const Tab = createBottomTabNavigator();

// const App = () => {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Tab.Navigator>
//           <Tab.Screen name="Home" component={HomeScreen} />
//           <Tab.Screen name="User" component={UserScreen} />
//           <Tab.Screen name="API" component={ApiScreen} />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// };

const RootStack = createStackNavigator(
  {
    Login: Login,
    Register: Register,
    Home: Home,
    Reset: Reset,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#19AC52',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const RootContainer = createAppContainer(RootStack);

export default function App() {
  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
}
