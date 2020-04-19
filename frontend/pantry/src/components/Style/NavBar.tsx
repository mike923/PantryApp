import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

/*
    <FeatherIcon name="shopping-cart" style={styles.icon7}></FeatherIcon>
    <FeatherIcon name="settings" style={styles.icon13}></FeatherIcon>
    <FeatherIcon name="plus-circle" style={styles.icon16}></FeatherIcon>
    <FeatherIcon name="shopping-bag" style={styles.icon14}></FeatherIcon>
    <FeatherIcon name="list" style={styles.icon15}></FeatherIcon>
*/
import HomeScreen from '../Screens/Welcome.tsx';
import UserScreen from '../Screens/UserScreen.tsx';
import ApiScreen from '../Screens/ApiScreen.tsx';
import ImageUpload from '../Upload/ImageUpload.tsx';

const Tab = createBottomTabNavigator();

const NavBar = (props: any) => {
  return (
    <>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let newSize = size;
              switch (route.name) {
                case 'Cart':
                  iconName = 'shopping-cart';
                  break;
                case 'Settings':
                  iconName = 'settings';
                  break;
                case 'Upload':
                  iconName = 'plus-circle';
                  newSize *= 1.5;
                  break;
                case 'User':
                  iconName = 'shopping-bag';
                  break;
                case 'API':
                  iconName = 'list';
                  break;
                default:
                  break;
              }

              // You can return any component that you like here!
              return (
                <FeatherIcon name={iconName} size={newSize} color={color} />
              );
            },
          })}
          tabBarOptions={{
            activeTintColor: '#ff5c61',
            inactiveTintColor: 'gray',
          }}>
          <Tab.Screen name="Cart" component={HomeScreen} />
          <Tab.Screen name="Settings" component={HomeScreen} />
          <Tab.Screen name="Upload" component={ImageUpload} />
          <Tab.Screen name="User" component={UserScreen} />
          <Tab.Screen name="API" component={ApiScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
};

export default NavBar;
