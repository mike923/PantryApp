import React, { useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  SectionList,
  TextInput,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import styled from 'styled-components';
import { styling } from './styles.ts';

const Upload = ({ navigation }) => {
  const goTo = navigation.navigate;

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.headingText}>
        This screen should act as a home page for all the screens in this stack
      </Text>
      <TouchableOpacity
        onPress={() => goTo('ImageUpload')}
        style={styles.button}>
        <Text style={styles.buttonText}>Image Upload</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => goTo('FoodItemForm')}
        style={styles.button}>
        <Text style={styles.buttonText}>Food Item Manual Entry</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Camera', { fromCart: false })}
        style={styles.button}>
        <Text style={styles.buttonText}>Camera</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#ff5c61',
    borderRadius: 50,
    marginVertical: 10,
    padding: 12,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'DINPro',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 25,
  },
  headingText: {
    color: '#ff5c61',
    fontFamily: 'DINPro',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 30,
  },
});

const Boton = styled.TouchableOpacity`
  background-color: #ff5c61;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 400px;
  padding: 15px 5px;
  margin: 10px;
  border: transparent;
  border
`;

export default Upload;
