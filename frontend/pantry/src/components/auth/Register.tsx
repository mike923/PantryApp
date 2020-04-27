import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, TouchableOpacity } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import CheckBox from 'react-native-check-box';
import { registerUser } from '../../redux/actions/userActions.ts';

import { styles } from './styles.ts';

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

  /*
title="Register"
onPress={() => register()}
<Text>Already a user?</Text>
*/

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.header}>Register Here</Text>

        <Input
          style={styles.input}
          placeholder="email@domain.dns"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={styles.input}
          placeholder="password123"
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
          style={styles.checkBox}
        />

        <TouchableOpacity style={styles.button} onPress={() => register()}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <Text style={styles.helpText}>Already A User?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

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
