import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import List from '../SwipeAbleList/SwipeAbleList';

const ShopCart = (props: any) => {
  const camera: object = useSelector((state) => state.camera);

  useEffect(() => {
    console.log('hey there');
  }, [camera]);

  const [products, setProducts] = useState(camera.products);

  const DATA = [
    { id: 1, message: 'Message #1' },
    { id: 2, message: 'Message #2' },
    { id: 3, message: 'Message #3' },
    { id: 4, message: 'Message #4' },
    { id: 5, message: 'Message #5' },
    { id: 6, message: 'Message #6' },
    { id: 7, message: 'Message #7' },
    { id: 8, message: 'Message #8' },
  ];

  let last = camera.products.length - 1;
  console.log('prod', camera.products[last]);

  return <List data={camera.products} />;
};

export default ShopCart;
