import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import UploadStack from './UploadStack.tsx';
// import SettingsStack from './SettingsStack.tsx';
import DashboardStack from './DashboardStack.tsx';
import PantryStack from './PantryStack.tsx';
import ShopCartStack from './ShopCartStack.tsx';
import ShoppingListStack from './ShoppingListStack.tsx';

const Tab = createBottomTabNavigator();

const TabBarNavigator = (props: any) => {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconConfig = {
                Pantry: { name: 'shopping-bag', size: size * 1.25 },
                Cart: { name: 'shopping-cart', size: size * 1.25 },
                Upload: { name: 'plus-circle', size: size * 2 },
                List: { name: 'list', size: size * 1.25 },
                Settings: { name: 'settings', size: size * 1.25 },
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
              paddingTop: 0,
              paddingBottom: 30,
              paddingHorizontal: 10,
              justifyContent: 'space-around',
              backgroundColor: '#fff',
              elevation: 0,
              shadowOpacity: 0,
              borderTopWidth: 0,
            },
          }}>
          <Tab.Screen name="Settings" component={DashboardStack} />
          <Tab.Screen name="Pantry" component={PantryStack} />
          <Tab.Screen name="Upload" component={UploadStack} />
          <Tab.Screen name="Cart" component={ShopCartStack} />
          <Tab.Screen name="List" component={ShoppingListStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default TabBarNavigator;
