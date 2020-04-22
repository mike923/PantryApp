import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';

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

export default FoodItem;
