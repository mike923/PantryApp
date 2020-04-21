import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../Screens/Welcome.tsx';
import UserScreen from '../Screens/UserScreen.tsx';
import ApiScreen from '../Screens/ApiScreen.tsx';
import ImageUpload from '../Upload/ImageUpload.tsx';

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
                Upload: { name: 'plus-circle', size: size * 1.75 },
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
            inactiveTintColor: 'gray',
            style: {
              paddingVertical: 5,
              paddingHorizontal: 40,
              justifyContent: 'space-around',
              backgroundColor: '#fff',
            },
          }}>
          <Tab.Screen name="Pantry" component={UserScreen} />
          <Tab.Screen name="Cart" component={HomeScreen} />
          <Tab.Screen name="Upload" component={ImageUpload} />
          <Tab.Screen name="List" component={ApiScreen} />
          <Tab.Screen name="Settings" component={HomeScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default TabBarNavigator;
