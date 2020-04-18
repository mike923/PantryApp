import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import CheckBox from 'react-native-check-box';
import { loginUser } from '../../redux/actions/userActions.ts';

import { styles } from './Styles.ts';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('Voniel@bvoniel.com');
  const [password, setPassword] = useState('voniel');
  const [passVisible, setPassVisible] = useState(true);

  const loggedUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedUser.loggedIn) {
      navigation.navigate('Home');
    }
  }, [dispatch, loggedUser]);

  // directs to log in screen after authentication
  const login = () => {
    dispatch(loginUser(email, password));

    if (loggedUser.loggedIn) {
      navigation.navigate('Home');
    }
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
            secureTextEntry={!!passVisible}
            value={password}
            onChangeText={setPassword}
          />
          <CheckBox
            onClick={() => {
              setPassVisible(!passVisible);
            }}
            isChecked={!passVisible}
            leftText="Visible"
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
        {loggedUser.loading && (
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
