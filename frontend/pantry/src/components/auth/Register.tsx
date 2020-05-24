import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CheckBox from 'react-native-check-box';
import { registerUser } from '../../redux/actions/userActions.ts';

import { styles } from './styles.ts';

export const Register = ({ navigation }) => {
  const [email, setEmail] = useState(''); // user inputting email
  const [password, setPassword] = useState(''); // user inputting password
  const [passVisible, setPassVisible] = useState(false); // toggling password visibility
  const [inputStyle, setInputStyle] = useState([18, 18]);

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    return undefined;
  }, [dispatch, user]);

  const register = async () => {
    if (email && password) {
      dispatch(registerUser(email, password));

      if (user.loggedIn) {
        navigation.navigate('AuthConatiner');
      }
    } else Alert.alert('Please enter valid email and password');
  };

  /*
title="Register"
onPress={() => register()}
<Text>Already a user?</Text>
*/

  return (
    <View style={styles.container}>
      <View style={[styles.image, styles.form]}>
        <Text style={styles.header}>Signup</Text>

        <TextInput
          style={[styles.input, { fontSize: inputStyle[0] }]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setInputStyle([22, 18])}
          onBlur={() => setInputStyle([18, 18])}
        />
        <TextInput
          style={[styles.input, { fontSize: inputStyle[1] }]}
          placeholder="Password"
          secureTextEntry={!!passVisible}
          value={password}
          onChangeText={setPassword}
          onFocus={() => setInputStyle([18, 22])}
          onBlur={() => setInputStyle([18, 18])}
        />
        <CheckBox
          onClick={() => {
            setPassVisible(!passVisible);
          }}
          isChecked={!passVisible}
          leftText="Visible"
          style={styles.checkBox}
          checkBoxColor="#ff5c61"
        />

        <TouchableOpacity
          style={[styles.button, styles.buttonLogin, styles.shadowButton]}
          onPress={() => register()}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        {/* <Text style={[styles.forgotPassword, styles.shadowText]}>
          Already A User?
        </Text> */}
        <TouchableOpacity
          style={[styles.button, styles.buttonSignup, styles.shadowButton]}
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
