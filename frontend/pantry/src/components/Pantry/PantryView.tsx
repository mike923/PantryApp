import React, { useEffect } from 'react';
import { IP_ADDRESS } from 'react-native-dotenv';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import axios from 'axios';

import FoodItem from './FoodItem.tsx';
import Foods from '../Reciepts/dummyData/dummyFoodItems.ts';

const foodItems = `http://${IP_ADDRESS}:4004/fooditem/receiptid/1`;

const PantryView = ({ navigation }) => {
  const goTo = (props) => navigation.navigate('FoodDetailed', { ...props });

  useEffect(() => {
    const apiCall = async () => {
      try {
        const data = await axios.get(foodItems);
        console.log(data);
        return data;
      } catch (err) {
        console.log(err);
      }
    };
    apiCall();
  }, []);

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
