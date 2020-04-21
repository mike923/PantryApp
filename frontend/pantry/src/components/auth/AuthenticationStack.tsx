import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler'; // Requred for @react-navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Login } from './Login.tsx';
import { Register } from './Register.tsx';
import { Reset } from './Reset.tsx';
import AuthContainer from './AuthContainer.tsx';

export const AuthStack = createAppContainer(
  createStackNavigator(
    {
      Login,
      Register,
      AuthContainer,
      Reset,
    },
    {
      initialRouteName: 'Login',
    },
  ),
);
