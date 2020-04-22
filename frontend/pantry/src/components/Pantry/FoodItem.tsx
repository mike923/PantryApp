import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';

const FoodItem = () => {
  return (
    <TouchableOpacity>
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

export default FoodItem;
