import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import List from '../SwipeAbleList/SwipeAbleList.tsx';
import EmptyCart from './emptyCart.tsx';
import { deleteItem } from '../../redux/actions/cameraActions.ts';

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
      console.log('elele', el);
      let key = el.upc;
      if (productObj[key]) {
        productObj[key].quantity += 1;
        // el['quantity'] = (el['quantity'] || 0) + 1;
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

  // let newProductArr = Object.values(productObj);

  return products.length ? (
    <List data={localProducts} deleteItem={() => dispatch(deleteItem)} />
  ) : (
    <EmptyCart navigation={navigation} />
  );
};

export default ShopCart;
