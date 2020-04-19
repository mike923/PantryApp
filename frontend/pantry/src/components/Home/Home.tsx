import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'; // Navigation wrapper for App
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

// import HomeScreen from '../Screens/HomeScreen.tsx';
// import UserScreen from '../Screens/UserScreen.tsx';
import ApiScreen from '../Screens/ApiScreen.tsx';

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Tab = createBottomTabNavigator();

const Home = ({ navigation }: Props) => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (userState) => {
    setUser(userState);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    return auth().onAuthStateChanged(onAuthStateChanged);
  }, []);

  if (initializing) return null;

  if (!user) return navigation.navigate('Login');

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator>
          {/* <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={color}
                  size={size}
                />
              ),
            }}
          />
          <Tab.Screen name="User" component={UserScreen} /> */}
          <Tab.Screen name="API" component={ApiScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

Home.navigationOptions = ({ navigation }) => ({
  title: 'Home',
  headerShown: false,
});

export default Home;
