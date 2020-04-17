import React, { useState } from 'react';
import { ActivityIndicator, View, Text, Alert } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import CheckBox from 'react-native-check-box';
import auth from '@react-native-firebase/auth';

import { styles } from './Styles';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [passVisible, setPassVisible] = useState(true);

  //firebase functions to log the user in with email and password
  //authenticate if the user has a valid account
  //directs to log in screen after authentication
  const login = async () => {
    if (!password || !email) {
      return Alert.alert('Please fill out all fields');
    }
    setShowLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setShowLoading(false);
        navigation.navigate('Home');
      })
      .catch(() => {
        setShowLoading(false);
        Alert.alert('Invalid credentials \n Please try again');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 28, height: 50 }}>Please Login!</Text>
        </View>
        <View style={styles.subContainer}>
          <Input
            style={styles.textInput}
            placeholder="Your Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={[styles.subContainer, styles.password]}>
          <Input
            style={styles.textInput}
            placeholder="Your Password"
            secureTextEntry={passVisible ? true : false}
            value={password}
            onChangeText={setPassword}
          />
          <CheckBox
            onClick={() => {
              setPassVisible(!passVisible);
            }}
            isChecked={!passVisible}
            leftText={'Visible'}
          />
        </View>
        <View style={styles.subContainer}>
          <Button
            style={styles.textInput}
            title="Login"
            onPress={() => login()}
          />
        </View>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Forgot Password?</Text>
        </View>
        <View style={styles.subContainer}>
          <Button
            style={styles.textInput}
            title="Reset Password"
            onPress={() => {
              navigation.navigate('Reset');
            }}
          />
        </View>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Not a user?</Text>
        </View>
        <View style={styles.subContainer}>
          <Button
            style={styles.textInput}
            title="Register"
            onPress={() => {
              navigation.navigate('Register');
            }}
          />
        </View>
        {showLoading && (
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    </View>
  );
};

Login.navigationOptions = ({ navigation }) => ({
  title: 'Login',
  headerShown: false,
});
