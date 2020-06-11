import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import styles from './styles.ts';

import dummyStores from './dummyData/dummyStores.ts';
import dummyReceipts from './dummyData/dummyReceipts.ts';
import ReceiptList from './ReceiptList.tsx';
import StorePicker from './StorePicker.tsx';

// interface Props {}

const Receipts = (props: any) => {
  const [selectedValue, setSelectedValue] = useState('-');
  const handleStoreChange = (itemValue: string, itemIndex: number) => {
    console.log(itemValue);
    setSelectedValue(itemValue);
  };

  return (
    <View style={styles.container}>
      {/* <StorePicker
        stores={dummyStores}
        selected={selectedValue}
        handleStoreChange={handleStoreChange}
      /> */}
      <View style={styles.scrollArea1}>
        <ScrollView
          contentContainerStyle={styles.scrollArea2}
          showsVerticalScrollIndicator={false}>
          <ReceiptList selected={selectedValue} receipts={dummyReceipts} />
        </ScrollView>
      </View>
      <Text style={styles.heading}>Receipts</Text>
    </View>
  );
};

export default Receipts;
