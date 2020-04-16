import React, { useState } from 'react';
import { ActivityIndicator, View, Text, Alert } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import { styles } from './Styles';

export const Reset = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [showLoading, setShowLoading] = useState(false);

  const reset = async () => {
    setShowLoading(true);
    if (!email) {
      return Alert.alert('Please enter a valid email');
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log('password reset');
        setShowLoading(false);
        navigation.navigate('Home');
      })
      .catch((error) => {
        setShowLoading(false);
        console.error(error);
        return Alert.alert('Invalid credentials \n Please try again!');
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 28, height: 50 }}>Reset Password!</Text>
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
          <Button
            style={styles.textInput}
            title="Reset"
            onPress={() => reset()}
          />
        </View>
        <View style={styles.subContainer}>
          <Button
            style={styles.textInput}
            title="Back to Login"
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

Reset.navigationOptions = ({ navigation }) => ({
  title: 'Reset',
  headerShown: false,
});
