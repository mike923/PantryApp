import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import FoodItem from './FoodItem.tsx';

const PantryView = () => {
  return (
    <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={styles.pantryView}>
        <Text>This will be my pantry view containing all the food items</Text>
        {Array(20).fill(<FoodItem />)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pantryView: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default PantryView;
