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
        style={{ height: 160, width: 160, borderRadius: 5 }}
      />
      <Text>Food Name goes here</Text>
      <Text>Food info goes here</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  foodItem: {
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    marginVertical: 10,
    padding: 9,
    width: '45%',
  },
});

export default FoodItem;
