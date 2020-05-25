import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import List from '../SwipeAbleList/SwipeAbleList.tsx';
import EmptyCart from './emptyCart.tsx';

const ShopCart = (props: any) => {
  const camera: object = useSelector((state) => state.camera);

  useEffect(() => {
    console.log('shopping cart hit');
  }, [camera]);

  let last = camera.products.length - 1;
  console.log('prod', camera.products);

  return camera.products.length ? (
    <List data={camera.products} />
  ) : (
    <EmptyCart />
  );
};

export default ShopCart;
