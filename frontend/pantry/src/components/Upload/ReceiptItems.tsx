import React from 'react';
import Item from './Item.tsx';

const ReceiptItem = ({ receipt, handleChange }: any) => {
  let filteredReceipt: any = receipt.filter(
    (items: any) => items.length === undefined,
  ); // filtering out array of scanned products

  const receipts = () => {
    return filteredReceipt.map((item: any) => (
      <Item
        name={item.name}
        value={item.name}
        price={item.price}
        quantity={item.quantity}
        handleChange={handleChange}
        key={item.name}
      />
    ));
  };
  return <>{receipts()}</>;
};

export default ReceiptItem;
