import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import CheckBox from 'react-native-check-box';
import { CommonActions } from '@react-navigation/native';
import { loginUser } from '../../redux/actions/userActions.ts';

import { styles } from './styles.ts';

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

  const old = false;

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.header}>Please Login</Text>

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

        <TouchableOpacity style={styles.button} onPress={() => login()}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.helpText}>Forgot Password?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Reset')}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>

        <Text style={styles.helpText}>Not A User?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Register</Text>
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

// const styles = StyleSheet.create({
//   activity: {
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 204, 206, 0.6)',
//     bottom: 0,
//     justifyContent: 'center',
//     left: 0,
//     position: 'absolute',
//     right: 0,
//     top: 0,
//   },
//   button: {
//     alignItems: 'center',
//     backgroundColor: '#ff5c61',
//     borderRadius: 50,
//     padding: 12,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   checkBox: {
//     marginBottom: 30,
//     padding: 11,
//   },
//   container: {
//     alignItems: 'center',
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//   },
//   form: {
//     width: '100%',
//   },
//   header: {
//     alignSelf: 'center',
//     fontFamily: 'Vibur',
//     fontSize: 50,
//     marginBottom: 50,
//   },
//   helpText: {
//     alignSelf: 'center',
//     marginBottom: 5,
//     marginTop: 15,
//   },
//   input: {
//     marginTop: 10,
//   },
// });
