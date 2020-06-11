import React from 'react';
// import { Picker } from 'react-native';
import { Picker } from '@react-native-community/picker';
import styles from './styles.ts';

interface Stores {
  name: string;
}

interface Props {
  stores: Array<Stores>;
  selected: any;
  handleStoreChange: any;
}

const StorePicker = ({ stores, selected, handleStoreChange }: Props) => {
  const storeItems = () => {
    return stores.map(({ name }: Stores, i: number) => {
      const d = i + 1;
      return <Picker.Item label={name} value={name} key={d} />;
    });
  };

  return (
    <Picker
      accessibilityLabel="store"
      selectedValue={selected}
      onValueChange={(itemValue, itemIndex) => handleStoreChange(itemValue)}
      style={styles.picker}
      itemStyle={styles.pickerItem}
      mode="dropdown">
      {storeItems()}
    </Picker>
  );
};

export default StorePicker;
