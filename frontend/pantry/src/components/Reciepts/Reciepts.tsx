import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  Picker,
  Dimensions,
} from 'react-native';
import styles, { CardContainer } from './styles.ts';

const dummyStores = [
  { name: '-' },
  { name: 'Target' },
  { name: 'Walmart' },
  { name: 'Whole Foods' },
  { name: 'Food Bazaar' },
];

const dummyReceipts = [
  { name: 'Target' },
  { name: 'Target' },
  { name: 'Target' },
  { name: 'Target' },
  { name: 'Walmart' },
  { name: 'Walmart' },
  { name: 'Walmart' },
  { name: 'Whole Foods' },
  { name: 'Whole Foods' },
  { name: 'Food Bazaar' },
];

const RecieptList = ({ selected }) => {
  return (
    <>
      {dummyReceipts.map(({ name }) =>
        selected === '-' || name === selected ? (
          <Card color="black" name={name} />
        ) : null,
      )}
    </>
  );
};

const Card = ({ color, name }) => {
  return (
    <CardContainer color={color}>
      <View style={styles.logoContainerStackRow}>
        <View style={styles.logoContainerStack}>
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri:
                  'https://1000logos.net/wp-content/uploads/2017/06/Target-Logo.png',
              }}
              resizeMode="contain"
              style={styles.storeLogo}
            />
          </View>
        </View>
        <View style={styles.storeNameColumn}>
          <Text style={styles.receiptStoreName}>{name}</Text>
          <Text style={styles.receiptTotalPrice}>$53.33</Text>
          <Text style={styles.receiptItemTotal}>18 Items</Text>
          <Text style={styles.receiptDate}>03/22/2019</Text>
        </View>
      </View>
    </CardContainer>
  );
};

const StorePicker = ({ stores, selected, handleStoreChange }) => {
  const storeItems = () => {
    return stores.map(({ name }) => <Picker.Item label={name} value={name} />);
  };
  return (
    <Picker
      selectedValue={selected}
      onValueChange={(itemValue, itemIndex) => handleStoreChange(itemValue)}
      style={styles.picker}
      itemStyle={styles.pickerItem}
      mode="dropdown">
      {storeItems()}
    </Picker>
  );
};

const Reciepts = (props) => {
  const [selectedValue, setSelectedValue] = useState('-');
  const handleStoreChange = (itemValue, itemIndex) => {
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
          <RecieptList selected={selectedValue} />
        </ScrollView>
      </View>
      <Text style={styles.heading}>Reciepts</Text>
    </View>
  );
};

export default Reciepts;
