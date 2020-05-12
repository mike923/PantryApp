import React from 'react';
import Card from './Card.tsx';

interface Reciept {
  name: string;
  uri: string | null;
  totalPrice: number | null;
  totalItems: number | null;
  purchasedDate: string | null;
}

interface Props {
  reciepts: Array<Reciept>;
  selected: string;
}

const RecieptList = ({ reciepts, selected }: Props) => {
  return (
    <>
      {reciepts.map((reciept: Reciept, i: number) =>
        reciept.name !== '-' ? (
          selected === '-' || reciept.name === selected ? (
            <Card color="#ffb3b5" reciept={reciept} key={i + 1} />
          ) : null
        ) : null,
      )}
    </>
  );
};

export default RecieptList;
