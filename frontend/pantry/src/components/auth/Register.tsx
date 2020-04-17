import React, { useState } from 'react';
import { ActivityIndicator, View, Text, Alert } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { styles } from './Styles';

export const Register = ({ navigation }) => {
  const [email, setEmail] = useState(''); // user inputting email
  const [password, setPassword] = useState(''); // user inputting password
  const [showLoading, setShowLoading] = useState(false); // sets the loading screen
  const [passVisible, setPassVisible] = useState(true); // toggling password visibility

  const register = async () => {
    setShowLoading(true);
    if (!password || !email) {
      return Alert.alert('Please fill out all fields');
    }

    //firebase functions to create a user with email and password
    //takes in email and password parameters
    //after account is created, user gets uuid and directed to the home page
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        setShowLoading(false);
        navigation.navigate('Home');
      })
      .catch((error) => {
        setShowLoading(false);

        //checking for the error codes
        //informing the user about improper inputs
        switch (error.code) {
          case 'auth/email-already-in-use':
            return Alert.alert('Invalid credentials \n Please try again!');
          case 'auth/invalid-email':
            return Alert.alert('Invalid credentials \n please try again!');
          case 'auth/weak-password':
            return Alert.alert('Invalid credentials \n please try again!');
          default:
            break;
        }

        console.error(error);
      });
  };

  //   console.log(passVisibility);

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
            secureTextEntry={passVisible ? true : false}
            value={password}
            onChangeText={setPassword}
          />
          <Button
            style={styles.passVisibility}
            onPress={() => {
              setPassVisible(!passVisible);
            }}>
            help
          </Button>
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
        {showLoading && (
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
