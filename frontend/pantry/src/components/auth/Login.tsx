import React, { useState } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Alert } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login</Text>
    </View>
  );
};

Login.navigationOptions = ({ navigation }) => ({
  title: 'Login',
  headerShown: false,
});
