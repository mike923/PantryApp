import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/actions/userActions.ts';
import { styles } from './styles.ts';

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
      <View style={styles.form}>
        <Text style={styles.header}>Register Here</Text>

        <Input
          style={styles.input}
          placeholder="email@domain.dns"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity
          style={[styles.button, { marginTop: 35 }]}
          onPress={() => reset()}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { marginTop: 35 }]}
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

Reset.navigationOptions = ({ navigation }) => ({
  title: 'Reset',
  headerShown: false,
});
