import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import CheckBox from 'react-native-check-box';
import { CommonActions } from '@react-navigation/native';
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
      navigation.navigate('AuthContainer');
    }
  }, [dispatch, loggedUser]);

  // directs to log in screen after authentication
  const login = () => {
    dispatch(loginUser(email, password));

    if (loggedUser.loggedIn) {
      navigation.navigate('AuthContainer');
      console.log(`Hitting`);
      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{ name: 'Upload' }],
      //   }),
      // );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View
          style={{
            marginTop: 200,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{ fontSize: 28 }}>Please Login!</Text>
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
        <TouchableOpacity
          style={styles.textInput}
          onPress={() => {
            login();
          }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
            Login
          </Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            marginTop: 25,
            marginBottom: 5,
            justifyContent: 'center',
          }}>
          <Text>Forgot Password?</Text>
        </View>
        <TouchableOpacity
          style={styles.textInput}
          onPress={() => {
            navigation.navigate('Reset');
          }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
            Reset Password
          </Text>
        </TouchableOpacity>
        <View
          style={{
            alignItems: 'center',
            marginTop: 25,
            marginBottom: 5,
            justifyContent: 'center',
          }}>
          <Text>Not a user?</Text>
        </View>
        <TouchableOpacity
          style={styles.textInput}
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
            Register
          </Text>
        </TouchableOpacity>
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
