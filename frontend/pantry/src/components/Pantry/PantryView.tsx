import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { client } from '../../../proxy';

import FoodItem from './FoodItem.tsx';
import Foods from '../Reciepts/dummyData/dummyFoodItems.ts';

const foodItems = `/fooditem/receiptid/1`;

const PantryView = ({ navigation }) => {
  const [state, setState] = useState([]);
  const goTo = (props) => navigation.navigate('FoodDetailed', { ...props });

  useEffect(() => {
    const apiCall = async () => {
      try {
        const { data } = await client.get(foodItems);
        console.log(data.payload);
        setState(data.payload);
        return data;
      } catch (err) {
        console.log(err);
        return err;
      }
    };
    apiCall();
  }, []);

  return (
    <ScrollView style={{ backgroundColor: 'white', flex: 1 }}>
      <Text style={{ alignSelf: 'center' }}>These are all you pantries!</Text>
      <View style={styles.pantryView}>
        {state.map((p: any) => (
          <FoodItem {...p} key={p.item_id} goTo={goTo} />
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
