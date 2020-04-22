import React from 'react';
import { Picker } from 'react-native';
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
    return stores.map(({ name }: Stores) => (
      <Picker.Item label={name} value={name} />
    ));
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

export default StorePicker;
