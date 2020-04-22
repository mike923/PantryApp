import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { confirmStyles as styles } from './styles.ts';
import Item from './Item.tsx';

const RecieptItem = ({ reciept }: any) => {
  const reciepts = () => {
    return Object.keys(reciept).map((name) => (
      <Item
        name={name}
        price={reciept[name].price}
        quantity={reciept[name].quantity}
      />
    ));
  };
  return <>{reciepts()}</>;
};

export default RecieptItem;
