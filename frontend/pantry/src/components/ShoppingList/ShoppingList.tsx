import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import Product from './Product.tsx';

import { client } from '../../../proxy';
import { shoppingListStyles } from './shoppingListStyles.ts';
import ItemForm from './ItemForm.tsx';

const ShoppingList = ({ navigation }: any) => {
  //   const navigateToImg = () => navigation.navigate('Pantry');
  //   const navigateToReceipts = () => navigation.navigate('Receipts');
  const [products, setProducts] = useState([]);
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addItem, setAddItem] = useState(false);

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

  useEffect(() => {
    // keyboard
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

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
  };

  const _keyboardDidHide = async () => {
    await handleSubmit();
    setQuantity(1);
    setItemName('');
    setAddItem(false);
  };

  console.log('name:', itemName, 'quant:', Number(quantity));

  return (
    <KeyboardAvoidingView style={shoppingListStyles.container}>
      <ScrollView style={shoppingListStyles.scrollContainer}>
        {products.map((item: any) => {
          return <Product item={item} key={item.id} />;
        })}
        <TouchableOpacity
          style={shoppingListStyles.addButton}
          onPress={() => setAddItem(!addItem)}>
          <Text>+</Text>
        </TouchableOpacity>
        <ItemForm
          addItem={addItem}
          setAddItem={setAddItem}
          setItemName={setItemName}
          setQuantity={setQuantity}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ShoppingList;
