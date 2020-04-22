import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import FoodItem from './FoodItem.tsx';

const PantryView = () => {
  return (
    <ScrollView style={styles.pantryView}>
      <Text>This will be my pantry view containing all the food items</Text>
      <FoodItem />
      <FoodItem />
      <FoodItem />
      <FoodItem />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pantryView: {
    backgroundColor: '#fff',
  },
});

export default PantryView;
