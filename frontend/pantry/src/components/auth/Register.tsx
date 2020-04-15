import React, { useState, useEffect } from 'react';
import { Button, View, Text } from 'react-native';

export const Register = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Register</Text>
    </View>
  );
};

Register.navigationOptions = ({ navigation }) => ({
  title: 'Register',
  headerShown: false,
});
