import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import List from '../SwipeAbleList/SwipeAbleList';

const ShopCart = (props: any) => {
  const camera: object = useSelector((state) => state.camera);

  useEffect(() => {
    console.log('shopping cart hit');
  }, [camera]);

  let last = camera.products.length - 1;
  console.log('prod', camera.products);

  return <List data={camera.products} />;
};

export default ShopCart;
