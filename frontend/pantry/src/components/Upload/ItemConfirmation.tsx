import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { confirmStyles as styles } from './styles.ts';
import RecieptItems from './RecieptItems.tsx';

import fakeParsedReciept from './dummyData/fakeParsedReciept.ts';

import { priceFix, quantityFix } from './helpers/helpers.ts';

const ItemConfirmation = (props: any) => {
  const [reciept, setReciept] = useState(fakeParsedReciept);
  const handleConfirm = () => {
    Alert.alert('Confirmed');
    console.log(reciept);
  };

  const handleChange = (item: any, name: any, text: any) => {
    console.log(item, name, text);
    setReciept(() => {
      const updatedReciept = { ...reciept };
      if (name === 'quantity') {
        updatedReciept.recieptItems[item][name] = quantityFix(text);
      } else if (name === 'price') {
        updatedReciept.recieptItems[item][name] = priceFix(text);
      } else {
        updatedReciept.recieptItems[item][name] = text;
      }
      return updatedReciept;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.storeContainer}>
        <View style={styles.storeHeading}>
          <View style={styles.storeNameRow}>
            <Text style={styles.storeName}>{reciept.storeName}</Text>
            <Text style={styles.storeDate}>{reciept.recieptDate}</Text>
          </View>
        </View>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <RecieptItems
            reciept={reciept.recieptItems}
            handleChange={handleChange}
          />
        </ScrollView>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Looks good!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ItemConfirmation;
