import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import List from '../SwipeAbleList/SwipeAbleList.tsx';
import EmptyCart from './emptyCart.tsx';
import { deleteItem } from '../../redux/actions/cameraActions.ts';
import { client } from '../../../proxy';

const ShopCart = ({ navigation }: any) => {
  const products: any = useSelector((state: any) => state.camera.products);
  const [localProducts, setLocalProducts] = useState([]);
  let productObj: any = {};
  let newProductArr;

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('shopping cart hit');
    newProductArr = constructProductObj();
  }, []);

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

    try {
      const { data } = await client.post(`/fooditem/add`, {
        quantity: itemObj.quantity,
        price: itemObj.shopNow.price,
        upc: itemObj.upc,
        imgUrl: itemObj.image,
        preferred_name: itemObj.name,
        receipt_id: 1,
      });
      console.log('food item upload', data);
    } catch (error) {
      console.log(error);
    }
  };

  return products.length ? (
    <List
      data={localProducts}
      deleteItem={(data: any) => dispatch(deleteItem(data))}
      uploadScannedItem={uploadScannedItem}
    />
  ) : (
    <EmptyCart navigation={navigation} />
  );
};

export default ShopCart;
