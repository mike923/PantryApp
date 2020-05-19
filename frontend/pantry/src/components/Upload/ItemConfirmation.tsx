import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import RecieptItems from './RecieptItems.tsx';
import { priceFix, quantityFix } from './helpers/helpers.ts';
import CameraModal from '../Camera/cameraModal.tsx';
import { PROXY } from '../../../proxy';

const ItemConfirmation = (props: any) => {
  const recog: object = useSelector((state) => state.camera);
  const dispatch = useDispatch();

  // console.log(route.params);
  const { navigation, parsedReceipt } = props;
  const [reciept, setReciept] = useState(parsedReceipt);
  const [modalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    Alert.alert('Confirm', '', [
      { text: 'No', onPress: () => console.log('Cancelled') },
      {
        text: 'Yes',
        onPress: async () => {
          const { data } = await axios.get(`${PROXY}`);
          console.log(data);
          // POST RECIEPT TO BACKEND
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Pantry' }],
            }),
          );
        },
      },
    ]);
    console.log(reciept);
  };

  const handleChange = (item: any, name: any, text: any) => {
    console.log(item, name, text);
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
    setReciept(updatedReciept);
  };

  const getRecieptTotal = () => {
    console.log(`HERE`, reciept);
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
    <>
      {reciept ? (
        <View style={styles.container}>
          <View style={styles.storeContainer}>
            <View style={styles.storeHeading}>
              <View style={styles.storeNameRow}>
                <TextInput
                  style={styles.storeName}
                  onChangeText={(text) =>
                    handleChange('storeName', null, text)
                  }>
                  {reciept.storeName}
                </TextInput>
                <TextInput
                  style={styles.storeDate}
                  onChangeText={(text) =>
                    handleChange('recieptDate', null, text)
                  }>
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
                <Text style={styles.totalText}>{getRecieptTotal()}</Text>
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
