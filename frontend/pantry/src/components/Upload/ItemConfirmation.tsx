import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { confirmStyles as styles } from './styles.ts';
import RecieptItems from './RecieptItems.tsx';

import fakeParsedReciept from './dummyData/fakeParsedReciept.ts';

import { priceFix, quantityFix } from './helpers/helpers.ts';

const ItemConfirmation = ({ navigation }: any) => {
  const [reciept, setReciept] = useState(fakeParsedReciept);
  const handleConfirm = () => {
    Alert.alert('Confirm', '', [
      { text: 'No', onPress: () => console.log('Cancelled') },
      {
        text: 'Yes',
        // onPress: () => navigation.navigate('PantryView'),
        onPress: () => {
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Pantry' }],
            }),
            // StackActions.reset({
            //   index: 0,
            //   actions: [NavigationActions.navigate({ routeName: 'Pantry' })],
            // }),
          );
        },
      },
    ]);
    console.log(reciept);
  };

  const handleChange = (item: any, name: any, text: any) => {
    console.log(item, name, text);
    setReciept(() => {
      const updatedReciept = { ...reciept };
      if (item === 'storeName') {
        updatedReciept.storeName = text;
      } else if (item === 'recieptDate') {
        updatedReciept.recieptDate = text;
      } else if (name === 'quantity') {
        updatedReciept.recieptItems[item][name] = quantityFix(text);
      } else if (name === 'price') {
        updatedReciept.recieptItems[item][name] = priceFix(text);
      } else {
        updatedReciept.recieptItems[item][name] = text;
      }
      return updatedReciept;
    });
  };

  const getRecieptTotal = () => {
    return Object.keys(reciept.recieptItems)
      .reduce(
        (acc, num) =>
          acc +
          reciept.recieptItems[num].quantity * reciept.recieptItems[num].price,
        0,
      )
      .toFixed(2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.storeContainer}>
        <View style={styles.storeHeading}>
          <View style={styles.storeNameRow}>
            <TextInput
              style={styles.storeName}
              onChangeText={(text) => handleChange('storeName', null, text)}>
              {reciept.storeName}
            </TextInput>
            <TextInput
              style={styles.storeDate}
              onChangeText={(text) => handleChange('recieptDate', null, text)}>
              {reciept.recieptDate}
            </TextInput>
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
          <View style={styles.totalRow}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>${getRecieptTotal()}</Text>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Looks good!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ItemConfirmation;
