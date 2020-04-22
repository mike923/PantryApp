import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { confirmStyles as styles } from './styles.ts';
import RecieptItems from './RecieptItems.tsx';

import fakeParsedReciept from './dummyData/fakeParsedReciept.ts';

const ItemConfirmation = (props: any) => {
  const handleConfirm = () => {
    Alert.alert('Confirmed');
  };
  return (
    <View style={styles.container}>
      <View style={styles.storeContainer}>
        <View style={styles.storeHeading}>
          <View style={styles.storeNameRow}>
            <Text style={styles.storeName}>{fakeParsedReciept.storeName}</Text>
            <Text style={styles.storeDate}>
              {fakeParsedReciept.recieptDate}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}>
          <RecieptItems reciept={fakeParsedReciept.recieptItems} />
        </ScrollView>
        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Looks good!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ItemConfirmation;
