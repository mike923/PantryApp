import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { resetPassword } from '../../redux/actions/userActions.ts';
import { styles } from './styles.ts';

interface StateProps {
  user: any;
}

export const Reset = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [inputStyle, setInputStyle] = useState(18);

  const user = useSelector((state: StateProps) => state.user);
  const dispatch = useDispatch();

  const reset = async () => {
    if (email) {
      dispatch(resetPassword(email));

      if (user.loggedIn) {
        navigation.navigate('AuthContainer');
      }
    } else Alert.alert('Please enter a valid email');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.image, styles.form]}>
        <Text style={styles.header}>Reset Password</Text>

        <TextInput
          style={[styles.input, styles.bottomMargin, { fontSize: inputStyle }]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setInputStyle(22)}
          onBlur={() => setInputStyle(18)}
        />

        <TouchableOpacity
          style={[styles.button, styles.buttonLogin, styles.shadowButton]}
          onPress={() => reset()}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

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

Reset.navigationOptions = ({ navigation }) => ({
  title: 'Reset',
  headerShown: false,
});
