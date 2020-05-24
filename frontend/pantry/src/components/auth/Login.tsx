import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ImageBackground,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import CheckBox from 'react-native-check-box';
import { loginUser } from '../../redux/actions/userActions.ts';

import { styles } from './styles.ts';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState('Voniel@bvoniel.com');
  const [password, setPassword] = useState('voniel');
  const [passVisible, setPassVisible] = useState(true);
  const [inputStyle, setInputStyle] = useState([18, 18]);

  const loggedUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedUser.loggedIn) {
      navigation.navigate('AuthContainer');
    }
  }, [dispatch, loggedUser]);

  // directs to log in screen after authentication
  const login = () => {
    if (email && password) {
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
    } else Alert.alert('Please enter valid email and password');
  };

  const old = false;

  return (
    <View style={styles.container}>
      <ImageBackground
        // source={require('../../../assets/images/background.png')}
        resizeMode="contain"
        style={[styles.image, styles.form]}>
        <View style={styles.formInputContainer}>
          <Text style={styles.header}>Login</Text>
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
            onPress={() => login()}>
            <Text style={{ ...styles.buttonText, ...styles.buttonLoginText }}>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSignup, styles.shadowButton]}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <Text
            style={[styles.forgotPassword, styles.shadowText]}
            onPress={() => navigation.navigate('Reset')}>
            Forgot Password
          </Text>
        </View>

        {loggedUser.loading && (
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#000000" />
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

Login.navigationOptions = ({ navigation }) => ({
  title: 'Login',
  headerShown: false,
});
