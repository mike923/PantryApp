import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet, Image } from 'react-native';

const FoodDetailed = (props: any) => {
  const [state, setState] = useState({ ...props.route.params });
  console.log(state);
  const { productName, purchasedDate, uri, quantity } = state;

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
      <TextInput
        style={styles.quantity}
        value={`${quantity}`}
        onChangeText={(text) => setState({ ...state, quantity: text })}
        keyboardType="number-pad"
        returnKeyType="done"
        editable
      />
      <TextInput
        style={styles.date}
        value={purchasedDate}
        onChangeText={(text) => setState({ ...state, date: text })}
        editable
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  date: {
    color: 'black',
    fontSize: 20,
    padding: 10,
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
});

export default FoodDetailed;
