import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { confirmStyles as styles } from './styles.ts';
import Item from './Item.tsx';

const RecieptItem = ({ reciept, handleChange }: any) => {
  const reciepts = () => {
    return Object.keys(reciept).map((name) => (
      <Item
        name={name}
        value={reciept[name].name}
        price={reciept[name].price}
        quantity={reciept[name].quantity}
        handleChange={handleChange}
      />
    ));
  };
  return <>{reciepts()}</>;
};

export default RecieptItem;
