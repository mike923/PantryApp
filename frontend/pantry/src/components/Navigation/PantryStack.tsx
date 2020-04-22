import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { screenOptions } from './style.ts';

const Stack = createStackNavigator();

const FoodItem = () => {
  return (
    <TouchableOpacity>
      <Image
        source="https://www.nwcoffeesupply.com/wp-content/uploads/2019/08/Oatly-Oat-Milk-Full-Fat.jpg"
        resizeMode="contain"
        style={{ height: 50, width: 50 }}
      />
      <Text />
    </TouchableOpacity>
  );
};

const Pantry = () => (
  <View>
    <Text>This will ideally be my pantry</Text>
  </View>
);

const SettingsStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
      }}>
      <Stack.Screen name="Pantry" component={Pantry} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  // button: {
  //   alignItems: 'center',
  //   backgroundColor: '#ff5c61',
  //   borderRadius: 50,
  //   marginVertical: 10,
  //   padding: 12,
  // },
  // buttonText: {
  //   color: '#fff',
  //   fontFamily: 'DINPro',
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
  // container: {
  //   backgroundColor: '#fff',
  //   flex: 1,
  //   padding: 25,
  // },
  // headingText: {
  //   color: '#ff5c61',
  //   fontFamily: 'DINPro',
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   marginVertical: 30,
  // },
});

export default SettingsStack;
