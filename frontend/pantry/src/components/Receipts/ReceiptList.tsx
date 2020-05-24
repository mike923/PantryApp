import React from 'react';
import Card from './Card.tsx';

interface Receipt {
  name: string;
  uri: string | null;
  totalPrice: number | null;
  totalItems: number | null;
  purchasedDate: string | null;
}

interface Props {
  receipts: Array<Receipt>;
  selected: string;
}

const ReceiptList = ({ receipts, selected }: Props) => {
  return (
    <>
      {receipts.map((receipt: Receipt, i: number) => {
        const d = i + 1;
        return receipt.name !== '-' ? (
          selected === '-' || receipt.name === selected ? (
            <Card color="#ffb3b5" receipt={receipt} key={d} />
          ) : null
        ) : null;
      })}
    </>
  );
};

export default ReceiptList;
