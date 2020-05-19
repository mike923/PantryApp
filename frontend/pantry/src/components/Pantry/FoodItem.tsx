import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

interface FoodItemProp {
  preferred_name: string;
  img_url: string;
  receipt_date: string;
  item_id: number;
  foodItem: any;
}

const FoodItem = (props: any) => {
  let { goTo } = props;
  const {
    preferred_name,
    img_url,
    receipt_date,
    item_id,
    ...foodItem
  }: FoodItemProp = goTo ? props : props.route.params;

  console.log(foodItem, props);

  return (
    <TouchableOpacity
      style={styles.foodItem}
      onPress={() => {
        goTo({ item_id, receipt_date });
      }}>
      <Image
        source={{
          uri: img_url,
        }}
        resizeMode="contain"
        style={{ height: 160, width: 160, borderRadius: 5 }}
      />
      <Text style={{ marginTop: 3 }}>{preferred_name}</Text>
      <Text style={{ marginTop: 3 }}>{receipt_date}</Text>
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
