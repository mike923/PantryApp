import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import Product from './Product.tsx';
import { client } from '../../../proxy';
import { shoppingListStyles } from './shoppingListStyles.ts';
import ItemForm from './ItemForm.tsx';

const wait = (timeout: any) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const ShoppingList = ({ navigation }: any) => {
  const [products, setProducts] = useState([]);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addItem, setAddItem] = useState(false);

  const [refreshing, setRefreshing] = React.useState(false);

  const fetchShoppingList = async () => {
    try {
      const {
        data: { payload },
      } = await client.get(`/shoppingList/`);
      console.log('list', payload);
      setProducts(payload);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // useEffect to fetch shopping list data
    fetchShoppingList();
  }, []);

  const onRefresh = React.useCallback(() => {
    // pull down on screen to refresh page
    setRefreshing(true);
    fetchShoppingList();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  // useEffect(() => {
  //   // keyboard
  //   Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

  //   return () => {
  //     Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
  //   };
  // }, []);

  // const _keyboardDidHide = async () => {
  //   await handleSubmit();
  //   setQuantity(1);
  //   setItemName('');
  //   setAddItem(false);
  // };

  const handleSubmit = async () => {
    console.log('item name', itemName);

    try {
      const { data }: any = await client.post('/shoppingList/upload', {
        product: itemName,
        quantity,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    fetchShoppingList();
  };

  console.log('name:', itemName, 'quant:', Number(quantity));

  return (
    <KeyboardAvoidingView style={shoppingListStyles.container}>
      <ScrollView
        style={shoppingListStyles.scrollContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {products.map((item: any) => {
          return <Product item={item} key={item.id} />;
        })}

        {addItem ? (
          <ItemForm
            addItem={addItem}
            setAddItem={setAddItem}
            setItemName={setItemName}
            setQuantity={setQuantity}
            handleSubmit={handleSubmit}
          />
        ) : null}
      </ScrollView>
      <TouchableOpacity
        style={shoppingListStyles.addButton}
        onPress={() => setAddItem(!addItem)}>
        <Text>+</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ShoppingList;
