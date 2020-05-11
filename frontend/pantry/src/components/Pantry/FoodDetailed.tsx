import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Image } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-datepicker';

const FoodDetailed = (props: any) => {
  const [state, setState] = useState({ ...props.route.params });
  const { productName, purchasedDate, uri, quantity } = state;
  const [date, setDate] = useState(new Date(purchasedDate));
  console.log(state);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.name}
        value={productName}
        onChangeText={(text) => setState({ ...state, productName: text })}
        editable
      />
      <Image source={{ uri }} resizeMode="contain" style={styles.img} />
      <View style={styles.quantityContainer}>
        <FeatherIcon
          name="minus-circle"
          size={26}
          color="black"
          onPress={() => setState({ ...state, quantity: state.quantity - 1 })}
        />
        <TextInput
          style={styles.quantity}
          value={`${quantity}`}
          onChangeText={(text) => setState({ ...state, quantity: text })}
          keyboardType="number-pad"
          returnKeyType="done"
          editable
        />
        <FeatherIcon
          name="plus-circle"
          size={26}
          color="black"
          onPress={() => setState({ ...state, quantity: state.quantity + 1 })}
        />
      </View>
      <TextInput
        style={styles.date}
        value={purchasedDate}
        onChangeText={(text) => setState({ ...state, date: text })}
        editable
      />
      <DatePicker
        date="2020-03-02"
        mode="date"
        display="calendar"
        onChange={purchasedDate}
        style={styles.datePicker}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        placeholder="2020-03-02"
        format="YYYY-MMM-DD"
        minDate="2019-01-01"
        maxDate="2020-05-01"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  date: {
    color: 'black',
    fontSize: 20,
    padding: 10,
  },
  datePicker: {
    backgroundColor: 'white',
    height: 20,
  },
  img: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: '40%',
    padding: 10,
    width: '100%',
  },
  name: {
    color: 'black',
    fontSize: 24,
    padding: 10,
  },
  quantity: {
    color: 'black',
    fontSize: 20,
    padding: 10,
  },
  quantityContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default FoodDetailed;
