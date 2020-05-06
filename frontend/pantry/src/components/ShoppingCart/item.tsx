import React from 'react';
import { View, Text } from 'react-native';

const Item = ({ title }) => {
  return (
    <View>
      <View>
        <Text>{title}</Text>
      </View>
    </View>
  );
};

export default Item;
