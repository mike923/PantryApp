import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import CheckBox from 'react-native-check-box';
import { registerUser } from '../../redux/actions/userActions.ts';

import { styles } from './Styles.ts';

export const Register = ({ navigation }) => {
  const [email, setEmail] = useState(''); // user inputting email
  const [password, setPassword] = useState(''); // user inputting password
  const [passVisible, setPassVisible] = useState(false); // toggling password visibility

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    return undefined;
  }, [dispatch, user]);

  const register = async () => {
    dispatch(registerUser(email, password));

    if (user.loggedIn) {
      navigation.navigate('AuthConatiner');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 28, height: 50 }}>Register Here!</Text>
        </View>
        <View style={styles.subContainer}>
          <Input
            style={styles.textInput}
            placeholder="Your Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.subContainer}>
          <Input
            style={styles.textInput}
            placeholder="Your Password"
            secureTextEntry={!passVisible}
            value={password}
            onChangeText={setPassword}
          />
          <CheckBox
            onClick={() => {
              setPassVisible(!passVisible);
            }}
            isChecked={passVisible}
            leftText="Visible"
          />
        </View>
        <View style={styles.subContainer}>
          <Button
            style={styles.textInput}
            title="Register"
            onPress={() => register()}
          />
        </View>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Already a user?</Text>
        </View>
        <View style={styles.subContainer}>
          <Button
            style={styles.textInput}
            title="Login"
            onPress={() => {
              navigation.navigate('Login');
            }}
          />
        </View>
        {user.loading && (
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    </View>
  );
};

Register.navigationOptions = ({ navigation }) => ({
  title: 'Register',
  headerShown: false,
});
