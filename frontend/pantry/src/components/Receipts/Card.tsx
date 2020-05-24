import React from 'react';
import { View, Image, Text } from 'react-native';
import styles, { CardContainer } from './styles.ts';

interface Reciept {
  name: string;
  uri: string | null;
  totalPrice: number | null;
  totalItems: number | null;
  purchasedDate: string | null;
}

interface Props {
  color: string;
  reciept: Reciept;
}

const Card = ({ color, reciept }: Props) => {
  const { name, uri, totalPrice, totalItems, purchasedDate } = reciept;
  return (
    <CardContainer color={color}>
      <View style={styles.logoContainerStackRow}>
        <View style={styles.logoContainerStack}>
          <View style={styles.logoContainer}>
            <Image
              source={{ uri }}
              resizeMode="contain"
              style={styles.storeLogo}
            />
          </View>
        </View>
        <View style={styles.storeNameColumn}>
          <Text style={styles.receiptStoreName}>{name}</Text>
          <Text style={styles.receiptTotalPrice}>${totalPrice}</Text>
          <Text style={styles.receiptItemTotal}>{totalItems} Items</Text>
          <Text style={styles.receiptDate}>{purchasedDate}</Text>
        </View>
      </View>
    </CardContainer>
  );
};

export default Card;
