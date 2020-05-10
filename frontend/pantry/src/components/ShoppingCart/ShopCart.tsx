import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Item from './item.tsx';
import { cartStyles } from './cartStyles.ts';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Oreo Cookies',
    price: 2.99,
    quantity: 2,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: '2% Milk',
    price: 4.99,
    quantity: 1,
  },
  {
    name: 'Rice Crispies Bar',
    price: 1.99,
    quantity: 5,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Hagen Daas',
    price: 6.99,
    quantity: 1,
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'Oreo Cookies',
    price: 2.99,
    quantity: 2,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: '2% Milk',
    price: 4.99,
    quantity: 1,
  },
  {
    name: 'Rice Crispies Bar',
    price: 1.99,
    quantity: 5,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Hagen Daas',
    price: 6.99,
    quantity: 1,
  },
];

const ShopCart = (props) => {
  const [selected, setSelected] = useState(new Map());
  const [deleteButton, setDeleteButton] = useState(false);

  const onSelect = useCallback(
    (id) => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      console.warn(id);
      setSelected(newSelected);
      setDeleteButton(!deleteButton);
    },
    [selected],
  );

  return (
    <SafeAreaView style={cartStyles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.name}
            selected={!!selected.get(item.id)}
            price={item.price}
            onSelect={onSelect}
            img={item.img}
          />
        )}
        keyExtractor={(item) => item.id}
        extraData={selected}
      />
      <View>
        {deleteButton ? (
          <TouchableOpacity
            style={[cartStyles.deleteButton, cartStyles.button]}>
            <FeatherIcon name="trash-2" style={cartStyles.deleteIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[cartStyles.addButton, cartStyles.button]}>
            <FeatherIcon name="plus-circle" style={cartStyles.deleteIcon} />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ShopCart;
