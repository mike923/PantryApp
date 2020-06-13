import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import styled from 'styled-components';

const Upload = ({ navigation }) => {
  const goTo = navigation.navigate;

  return (
    <ScrollView style={styles.container}>
      {/* <StatusBar barStyle="dark-content" /> */}
      <Text style={styles.headingText}>How would you like to proceed</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Camera', { fromCart: false })}
        style={styles.button}>
        <Text style={styles.buttonText}>Scan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => goTo('FoodItemForm')}
        style={styles.button}>
        <Text style={styles.buttonText}>Manual Entry</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => goTo('ImageUpload')}
        style={styles.button}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => goTo('TestCam')} style={styles.button}>
        <Text style={styles.buttonText}>Test Cam</Text>
      </TouchableOpacity> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#ff5c61',
    borderRadius: 50,
    elevation: 2,
    marginVertical: 10,
    padding: 12,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
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
    backgroundColor: '#fcf7f4',
    borderColor: 'black',
    borderRadius: 5,
    borderWidth: 1,
    color: 'black',
    elevation: 5,
    fontFamily: 'DINPro',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '25%',
    marginTop: 0,
    marginVertical: 30,
    padding: 30,
    paddingBottom: 90,
    paddingTop: 90,
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    // color: '#ff5c61',
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
