import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const FoodItem = (props: any) => {
  let { goTo } = props;
  const { productName, uri, purchasedDate, quantity } = goTo
    ? props
    : props.route.params;
  return (
    <TouchableOpacity
      style={styles.foodItem}
      onPress={() => {
        goTo({ productName, uri, purchasedDate, quantity });
      }}>
      <Image
        source={{
          uri,
        }}
        resizeMode="contain"
        style={{ height: 160, width: 160, borderRadius: 5 }}
      />
      <Text style={{ marginTop: 3 }}>{productName}</Text>
      <Text style={{ marginTop: 3 }}>Date Purchased: {purchasedDate}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  foodItem: {
    alignItems: 'center',
    backgroundColor: '#ffe6e6',
    borderRadius: 10,
    marginVertical: 10,
    padding: 9,
    width: '45%',
  },
});

export default FoodItem;
