import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

const User = ({ navigation }) => {
  const navigateToHome = () => navigation.navigate('Home')
  return (
    <View style={styles.container}>
      <Text>User</Text>
      <TouchableOpacity onPress={navigateToHome} style={styles.button}>
        <Text style={styles.buttonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default User;
