import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const FoodItem = () => {
  return (
    <TouchableOpacity style={styles.foodItem}>
      <Image
        source={{
          uri:
            'https://www.nwcoffeesupply.com/wp-content/uploads/2019/08/Oatly-Oat-Milk-Full-Fat.jpg',
        }}
        resizeMode="contain"
        style={{ height: 150, width: 150 }}
      />
      <Text>Food Name goes here</Text>
      <Text>Food info goes here</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  foodItem: {
    backgroundColor: '#eee',
    marginHorizontal: 15,
    marginVertical: 10,
    width: 160,
  },
});

export default FoodItem;
