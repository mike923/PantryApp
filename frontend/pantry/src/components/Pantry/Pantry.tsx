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

const Pantry = ({ navigation }) => {
  const goTo = navigation.navigate;

  return (
    <ScrollView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.headingText}>
        This screen should act as a home page for all the screens in this stack
      </Text>
      <TouchableOpacity onPress={() => goTo('FoodItem')} style={styles.button}>
        <Text style={styles.buttonText}>Food Item</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => goTo('PantryView')}
        style={styles.button}>
        <Text style={styles.buttonText}>Pantry View</Text>
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

export default Pantry;
