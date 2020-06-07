import React, { useState, useEffect, useCallback } from 'react';
import {
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Product from './Product.tsx';
import { client } from '../../../proxy';
import { shoppingListStyles } from './shoppingListStyles.ts';
import ItemForm from './ItemForm.tsx';
import EmptyShoppingList from './emptyShoppinglist.tsx';

// function that sets the loading time for the page refresh
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
    // fetching all user shopping list items from database
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

  const onRefresh = useCallback(() => {
    // pull down on screen to refresh page
    setRefreshing(true);
    fetchShoppingList();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  // updated item status to complete to remove from list
  const setItemToComplete = async (id: any) => {
    try {
      const { data } = await client.patch(`/shoppingList/completed/${id}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    fetchShoppingList();
  };

  // submit new list item
  const handleSubmit = async () => {
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
    setItemName('');
    setQuantity(1);
  };

  // updates the text of the list
  const updateItem = async (id: any, product: string, quant: any) => {
    try {
      const { data }: any = await client.patch(`/shoppingList/update/${id}`, {
        product,
        quantity: quant,
      });
      console.log('item update', data);
    } catch (error) {
      console.log('update error', error);
    }
    fetchShoppingList();
  };

  console.log('name:', itemName, 'quant:', Number(quantity));

  return (
    <KeyboardAvoidingView style={shoppingListStyles.container}>
      {products.length ? (
        <ScrollView
          style={shoppingListStyles.scrollContainer}
          refreshControl={
            // allows for pull down to refresh page
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {products.map((item: any) => {
            return (
              // component the renders each item in the list
              <Product
                key={item.id}
                keyVal={item.id}
                item={item.product}
                quant={item.quantity}
                unique={item.product}
                updateItem={updateItem}
                setItemToComplete={setItemToComplete}
              />
            );
          })}
        </ScrollView>
      ) : (
        <EmptyShoppingList />
      )}
      {addItem ? ( // checking if the user clicked button to add new item
        <ItemForm
          addItem={addItem}
          setAddItem={setAddItem}
          setItemName={setItemName}
          setQuantity={setQuantity}
          handleSubmit={handleSubmit}
        />
      ) : null}
      <TouchableOpacity
        style={shoppingListStyles.addButton}
        onPress={() => setAddItem(!addItem)}>
        <Icon name="plus" style={shoppingListStyles.plus} />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ShoppingList;

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
