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
  const [productInfo, setProductInfo] = useState('');
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

  const _keyboardDidHide = () => {
    alert('Keyboard Hidden');
  };

  console.log('info', productInfo);

  return (
    <KeyboardAvoidingView style={shoppingListStyles.container}>
      {/* <SafeAreaView> */}
      <ScrollView style={shoppingListStyles.scrollContainer}>
        {products.map((item) => {
          return <Product item={item} key={item.id} />;
        })}
      </ScrollView>
      {/* <View style={shoppingListStyles.footer}>
        <TextInput
          style={shoppingListStyles.textInput}
          placeholder="Item"
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          onChangeText={(text) => setProductInfo(text)}
          value={productInfo}
        />
      </View> */}
      <TouchableOpacity
        style={shoppingListStyles.addButton}
        onPress={() => setAddItem(!addItem)}>
        <Text>+</Text>
      </TouchableOpacity>
      <ItemForm addItem={addItem} setAddItem={setAddItem} />
      {/* </SafeAreaView> */}
    </KeyboardAvoidingView>
  );
};

export default ShoppingList;
