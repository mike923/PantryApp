import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import Item from './item.tsx';
import { cartStyles } from './cartStyles.ts';
import FloatingActionButton from './floatingCartOptionButton';
import { useSelector, useDispatch } from 'react-redux';
import SwipeValueBasedUi from './SwipeAbleList';
import DraggableFlatList from 'react-native-draggable-flatlist';

const ShopCart = (props: any) => {
  const [selected, setSelected] = useState(new Map());
  const [deleteButton, setDeleteButton] = useState(false);
  const camera: object = useSelector((state) => state.camera);

  useEffect(() => {
    console.log('hey there');
  }, [camera]);

  const [data, setData] = useState(camera.products);

  // const DATA = camera.products;

  const onSelect = useCallback(
    (id) => {
      const newSelected = new Map(selected);
      newSelected.set(id, !selected.get(id));
      console.warn(id);
      setSelected(newSelected);
      setDeleteButton(!deleteButton);
      console.log();
    },
    [selected],
  );

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

  return (
    <SafeAreaView style={cartStyles.container}>
      {/* <FlatList
        data={DATA.length ? DATA : []}
        renderItem={({ item }) => (
          <Item
            id={item.id}
            title={item.title}
            selected={!!selected.get(item.id)}
            price={item.price}
            onSelect={onSelect}
            img={item.images[0]}
          />
        )}
        keyExtractor={(item) => item.id}
        extraData={selected}
      /> */}
      <DraggableFlatList
        data={data}
        enderItem={renderItem}
        keyExtractor={(item: object) => `draggable-item-${item.id}`}
        onDragEnd={({ data }) => setData({ data })}
      />
      <View style={{ flex: 1, alignItems: 'center' }}>
        {/* {deleteButton ? (
          <TouchableOpacity
            style={[cartStyles.deleteButton, cartStyles.button]}>
            <FeatherIcon name="trash-2" style={cartStyles.deleteIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[cartStyles.addButton, cartStyles.button]}>
            <FeatherIcon name="plus-circle" style={cartStyles.deleteIcon} />
          </TouchableOpacity>
        )} */}
        <FloatingActionButton style={{ button: 100 }} />
      </View>
    </SafeAreaView>
  );
};

export default ShopCart;
