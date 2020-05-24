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
import { useSelector, useDispatch } from 'react-redux';
import { confirmStyles as styles } from './styles.ts';
import ReceiptItems from './ReceiptItems.tsx';
import { priceFix, quantityFix } from './helpers/helpers.ts';
import CameraModal from '../Camera/cameraModal.tsx';
import { client } from '../../../proxy';
import { parseReceipt } from '../../redux/actions/textRecogActions.ts';

const ItemConfirmation = (props: any) => {
  const dispatch = useDispatch();

  // connecting component to text recognition redux state with redux hooks
  const receipt: any = useSelector((state) => state.recog.receipt);

  // console.log(route.params);
  const { navigation } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    Alert.alert('Confirm', '', [
      { text: 'No', onPress: () => console.log('Cancelled') },
      {
        text: 'Yes',
        onPress: async () => {
          const data = await client.get('/test');
          console.log(data);
          // TODO POST RECEIPT TO BACKEND
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Pantry' }],
            }),
          );
        },
      },
    ]);
    console.log(receipt);
  };

  const handleChange = (item: any, name: any, text: any) => {
    console.log(item, name, text);
    const updatedReceipt = { ...receipt };
    if (item === 'storeName') {
      updatedReceipt.storeName = text;
    } else if (item === 'receiptDate') {
      updatedReceipt.receiptDate = text;
    } else if (name === 'quantity') {
      updatedReceipt.receiptItems[item][name] = quantityFix(text);
    } else if (name === 'price') {
      updatedReceipt.receiptItems[item][name] = priceFix(text);
    } else {
      updatedReceipt.receiptItems[item][name] = text;
    }
    dispatch(parseReceipt(updatedReceipt));
  };

  const getReceiptTotal = () => {
    // FIXME fix the NaN displaying instead of the total
    console.log(`HERE`, Object.values(receipt.receiptItems));
    return Object.keys(receipt.receiptItems)
      .reduce(
        (acc, num) =>
          acc +
          receipt.receiptItems[num].quantity * receipt.receiptItems[num].price,
        0,
      )
      .toFixed(2);
  };

  let mergedProducts: any = [];
  // checking if the user scanned any items
  if (receipt.receiptItems.scannedProducts) {
    // if items were scanned merge the the receiptItems values with the barcodes
    mergedProducts = [
      ...Object.values(receipt.receiptItems),
      ...receipt.receiptItems.scannedProducts,
    ];
  } else {
    // if nothing was scanned user only needs to confirm the items on the receipt
    mergedProducts = Object.values(receipt.receiptItems);
  }

  return (
    <>
      {receipt ? (
        <View style={styles.container}>
          <View style={styles.storeContainer}>
            <View style={styles.storeHeading}>
              <View style={styles.storeNameRow}>
                <TextInput
                  style={styles.storeName}
                  onChangeText={(text) =>
                    handleChange('storeName', null, text)
                  }>
                  {receipt.storeName}
                </TextInput>
                <TextInput
                  style={styles.storeDate}
                  onChangeText={(text) =>
                    handleChange('receiptDate', null, text)
                  }>
                  {receipt.receiptDate}
                </TextInput>
              </View>
            </View>
          </View>
          <View style={styles.scrollViewContainer}>
            <ScrollView
              contentContainerStyle={styles.scrollView}
              showsVerticalScrollIndicator={false}>
              <ReceiptItems
                receipt={mergedProducts}
                handleChange={handleChange}
              />
              <View style={styles.totalRow}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalText}>{getReceiptTotal()}</Text>
              </View>
            </ScrollView>
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={handleConfirm}>
                <Text style={styles.confirmText}>Looks good!</Text>
              </TouchableOpacity>
              {!modalVisible ? (
                <TouchableOpacity
                  style={styles.scanBarcode}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text>Scan</Text>
                </TouchableOpacity>
              ) : (
                <CameraModal
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                />
              )}
            </View>
          </View>
        </View>
      ) : null}
    </>
  );
};

export default ItemConfirmation;
