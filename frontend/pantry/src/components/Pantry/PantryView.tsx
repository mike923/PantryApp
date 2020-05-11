import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import FoodItem from './FoodItem.tsx';
import Foods from '../Reciepts/dummyData/dummyFoodItems.ts';

const PantryView = ({ navigation }) => {
  const goTo = (props) => navigation.navigate('FoodDetailed', { ...props });

  return (
    <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={styles.pantryView}>
        <Text>This will be my pantry view containing all the food items</Text>
        {Foods.map((p, i) => (
          <FoodItem {...p} key={i + 1} goTo={goTo} />
        ))}
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
