import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View, Text, Alert } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/actions/userActions.ts';
import { styles } from './Styles.ts';

export const Reset = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // useEffect(() => {}, [dispatch, user]);

  const reset = async () => {
    dispatch(resetPassword(email));

    if (user.loggedIn) {
      navigation.navigate('AuthContainer');
    }
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
        {user.loading && (
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
