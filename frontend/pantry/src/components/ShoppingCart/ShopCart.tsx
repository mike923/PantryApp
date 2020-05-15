import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
// import Item from './item.tsx';
// import { cartStyles } from './cartStyles.ts';
// import FloatingActionButton from './floatingCartOptionButton';
import { useSelector, useDispatch } from 'react-redux';
// import SwipeValueBasedUi from '../SwipeAbleList/SwipeAbleList';
// import DraggableFlatList from 'react-native-draggable-flatlist';
import List from '../SwipeAbleList/SwipeAbleList';

const ShopCart = (props: any) => {
  const [selected, setSelected] = useState(new Map());
  const [deleteButton, setDeleteButton] = useState(false);
  const camera: object = useSelector((state) => state.camera);

  useEffect(() => {
    console.log('hey there');
  }, [camera]);

  const [data, setData] = useState(camera.products);

  // const DATA = camera.products;

  const renderItem = ({ item, index, drag, isActive }) => {
    return (
      <TouchableOpacity
        style={{
          height: 100,
          backgroundColor: isActive ? 'blue' : item.backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onLongPress={drag}>
        <Text
          style={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: 32,
          }}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };
  const DATA = [
    { id: 1, message: 'Message #1' },
    { id: 2, message: 'Message #2' },
    { id: 3, message: 'Message #3' },
    { id: 4, message: 'Message #4' },
    { id: 5, message: 'Message #5' },
    { id: 6, message: 'Message #6' },
    { id: 7, message: 'Message #7' },
    { id: 8, message: 'Message #8' },
  ];

  return <List data={DATA} />;
};

export default ShopCart;
