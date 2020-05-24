import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  Picker,
  Dimensions,
} from 'react-native';
import styles from './styles.ts';

import dummyStores from './dummyData/dummyStores.ts';
import dummyReceipts from './dummyData/dummyReciepts.ts';
import RecieptList from './RecieptList.tsx';
import StorePicker from './StorePicker.tsx';

interface Props {}

const Reciepts = (props: Props) => {
  const [selectedValue, setSelectedValue] = useState('-');
  const handleStoreChange = (itemValue: string, itemIndex: number) => {
    console.log(itemValue);
    setSelectedValue(itemValue);
  };

  return (
    <View style={styles.container}>
      <StorePicker
        stores={dummyStores}
        selected={selectedValue}
        handleStoreChange={handleStoreChange}
      />
      <View style={styles.scrollArea1}>
        <ScrollView
          contentContainerStyle={styles.scrollArea2}
          showsVerticalScrollIndicator={false}>
          <RecieptList selected={selectedValue} reciepts={dummyReceipts} />
        </ScrollView>
      </View>
      <Text style={styles.heading}>Reciepts</Text>
    </View>
  );
};

export default Reciepts;
