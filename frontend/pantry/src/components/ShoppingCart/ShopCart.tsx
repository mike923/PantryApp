import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView, RefreshControl, View, Text } from 'react-native';
import List from '../SwipeAbleList/SwipeAbleList.tsx';
import EmptyCart from './emptyCart.tsx';
import { deleteItem } from '../../redux/actions/cameraActions.ts';
import { client } from '../../../proxy';
import { cartStyles } from './cartStyles.ts';

const wait = (timeout: any) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const ShopCart = ({ navigation }: any) => {
  const products: any = useSelector((state: any) => state.camera.products);
  const [localProducts, setLocalProducts] = useState([]);
  let productObj: any = {};

  const [refreshing, setRefreshing] = React.useState(false);

  console.log('gtfctgchchh');

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('shopping cart hit');

    // if (products.length >= 2) {
    constructProductObj();
    // }
  }, [products]);

  const constructProductObj = () => {
    products.forEach((el: any) => {
      let key = el.upc;
      if (productObj[key]) {
        productObj[key].quantity += 1;
      } else {
        el.quantity = 1;
        productObj[key] = el;
      }
    });
    setLocalProducts(Object.values(productObj));
    return Object.values(productObj);
  };
  console.log('set', productObj);
  console.log('products', localProducts);

  const uploadScannedItem = async (itemObj: any) => {
    console.log('hit em upload');

    let placeHolder =
      'https://cdn0.iconfinder.com/data/icons/ecommerce-57/100/Ecommerce_RTE-03-512.png';
    try {
      const { data } = await client.post(`/fooditem/add`, {
        quantity: itemObj.quantity,
        price: itemObj.shopNow[0].price || 0,
        upc: itemObj.upc,
        imgUrl: itemObj.image[0] || placeHolder,
        preferred_name: itemObj.name,
        receipt_id: null,
      });
      console.log('food item upload', data);
    } catch (error) {
      console.log(error);
    }
  };
  const onRefresh = useCallback(() => {
    // pull down on screen to refresh page
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return products.length ? (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <Text style={cartStyles.instructions}>
        Swipe Right to
        <Text style={{ color: 'green' }}> Add </Text>
        or Left to
        <Text style={{ color: '#991a00' }}> Delete</Text>
      </Text>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            style={{ backgroundColor: 'white' }}
          />
        }>
        <List
          data={localProducts}
          deleteItem={(data: any) => dispatch(deleteItem(data))}
          uploadScannedItem={uploadScannedItem}
        />
      </ScrollView>
    </View>
  ) : (
    <EmptyCart navigation={navigation} />
  );
};

export default ShopCart;
