import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { updatedSelectedFood } from '../../redux/actions/pantryActions.ts';

interface FoodItemProp {
  preferred_name: string;
  img_url: string;
  receipt_date: string;
  item_id: number;
  foodItem: any;
}

const FoodItem = (props: any) => {
  console.log('THESE ARE THE PROPS: ', props);
  let { goTo, index } = props;
  const dispatch = useDispatch();
  // const state = useSelector((state) => state.pantry[index].pantryItems);
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
        dispatch(updatedSelectedFood(`${preferred_name}`));
        goTo({ ...props, goTo: '', item_id, receipt_date, index });
      }}>
      <Image
        source={{
          uri: img_url,
        }}
        resizeMode="contain"
        style={{ height: 160, width: 160, borderRadius: 5 }}
      />
      <Text style={styles.itemName}>{preferred_name}</Text>
      {/* <Text style={{ marginTop: 3 }}>{receipt_date}</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  foodItem: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#ff5c61',
    borderRadius: 5,
    elevation: 3,
    marginVertical: 10,
    padding: 9,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2.22,
    width: '45%',
  },
  itemName: {
    color: '#000',
    marginTop: 3,
  },
});

export default FoodItem;
