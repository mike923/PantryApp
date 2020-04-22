import React from 'react';
import { View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import FoodItem from './FoodItem.tsx';

const PantryView = () => {
  return (
    <ScrollView>
      <Text>This will be my pantry view containing all the food items</Text>
      <FoodItem />
      <FoodItem />
      <FoodItem />
      <FoodItem />
    </ScrollView>
  );
};

export default PantryView;
