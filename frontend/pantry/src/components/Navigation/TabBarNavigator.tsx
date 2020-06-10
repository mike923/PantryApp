import React, { useEffect } from 'react';
// import { StyleSheet, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import { useDispatch } from 'react-redux';

import UploadStack from './UploadStack.tsx';
// import SettingsStack from './SettingsStack.tsx';
import DashboardStack from './DashboardStack.tsx';
import PantryStack from './PantryStack.tsx';
import ShopCartStack from './ShopCartStack.tsx';
import ShoppingListStack from './ShoppingListStack.tsx';
import {
  connectionState,
  connectionAlert,
} from '../../redux/actions/appActions.ts';

const Tab = createBottomTabNavigator();

const TabBarNavigator = (props: any) => {
  const dispatch = useDispatch();

  // checking the user connected to a network
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      console.log('Expensive connection?', state.details.isConnectionExpensive);
      dispatch(connectionState(state.isConnected, state.type));
      return connectionAlert(state.isConnected, state.type);
    });

    // connectionAlert();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconConfig = {
                Pantry: { name: 'shopping-bag', size: size * 1.25 },
                ShoppingCart: { name: 'shopping-cart', size: size * 1.25 },
                Upload: { name: 'plus-circle', size: size * 2 },
                List: { name: 'list', size: size * 1.25 },
                Dashboard: { name: 'settings', size: size * 1.25 },
              };
              let icon = iconConfig[route.name];
              return (
                <FeatherIcon name={icon.name} size={icon.size} color={color} />
              );
            },
          })}
          tabBarOptions={{
            showLabel: false,
            activeTintColor: '#ff5c61',
            inactiveTintColor: '#000',
            style: {
              height: '9%',
              paddingTop: 0,
              paddingBottom: 0,
              paddingHorizontal: 10,
              justifyContent: 'space-around',
              backgroundColor: '#fff',
              elevation: 0,
              shadowOpacity: 0,
              borderTopWidth: 0,
            },
          }}>
          <Tab.Screen name="Dashboard" component={DashboardStack} />
          <Tab.Screen name="Pantry" component={PantryStack} />
          <Tab.Screen name="Upload" component={UploadStack} />
          <Tab.Screen name="ShoppingCart" component={ShopCartStack} />
          <Tab.Screen name="List" component={ShoppingListStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default TabBarNavigator;
