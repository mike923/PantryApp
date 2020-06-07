import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FeatherIcons from 'react-native-vector-icons/Feather';

import { client } from '../../../proxy';

const ItemForm = () => {
  const initialFoodItem = {
    preferred_name: 'product name',
    receipt_id: null,
    price: null,
    quantity: 1,
    upc: '',
    imgUrl: '',
  };
  const [foodItem, setFoodItem] = useState(
    Object.keys(initialFoodItem).map((name, index) => ({
      name,
      index,
      value: initialFoodItem[name],
    })),
  );

  const handleChange = (input: any, labelOrValue: string, text: string) => {
    let copyOfFoodItem = [...foodItem];
    copyOfFoodItem[input.index][labelOrValue] = text;
    setFoodItem(copyOfFoodItem);
  };

  const InputText = (input: any) => {
    const { name, index, value } = input;

    return (
      <View key={index} style={style.input}>
        <TextInput
          style={style.inputLabel}
          value={name}
          placeholder={value ? '' : 'label'}
          placeholderTextColor="#ccc"
          onChangeText={(text) => {
            if (index < 6) return;
            handleChange(input, 'name', text);
          }}
        />
        <TextInput
          style={style.inputValue}
          value={`${value}`}
          placeholder={value ? '' : 'input value'}
          placeholderTextColor="#ccc"
          onChangeText={(text) => {
            handleChange(input, 'value', text);
          }}
        />
        {index >= 6 && (
          <TouchableOpacity
            style={style.delete}
            onPress={() => {
              let copyOfFoodItem = [...foodItem];
              copyOfFoodItem.splice(index, 1);
              console.log(copyOfFoodItem);
              copyOfFoodItem = copyOfFoodItem.map((inp, i) => ({
                ...inp,
                i,
              }));
              console.log(copyOfFoodItem);
              setFoodItem(copyOfFoodItem);
            }}>
            <FeatherIcons name="x" size={30} color="black" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const addNewInput = () =>
    setFoodItem([
      ...foodItem,
      {
        name: 'input name',
        index: foodItem.length,
        value: '',
      },
    ]);

  const submit = async () => {
    let foodItemForm = {};
    foodItem.forEach((input) => {
      foodItemForm[input.name] = input.value;
    });
    const { data } = await client
      .post('/fooditem/add', foodItemForm)
      .catch((error) => console.log(error));
    console.log(data);
  };

  return (
    <>
      <ScrollView style={style.outerContainer}>
        <View style={style.innerContainer}>
          <Text>Add your food item here</Text>
          {/* <ImageUpload/> */}
          {foodItem.map((input) => InputText(input))}
          <TouchableOpacity style={style.button} onPress={addNewInput}>
            <Text style={style.buttonText}>Additional Inputs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.button, style.submit]}
            onPress={submit}>
            <Text style={style.buttonText}>Submit Form</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const style = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#ff5c61',
    borderRadius: 50,
    marginVertical: 10,
    padding: 12,
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'DINPro',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  innerContainer: {
    flex: 1,
    margin: 25,
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    height: 40,
  },
  inputLabel: {
    color: 'black',
    fontSize: 20,
    width: '35%',
  },
  inputValue: {
    color: 'black',
    flex: 1,
    fontSize: 20,
  },
  outerContainer: {
    backgroundColor: 'white',
  },
  submit: {
    backgroundColor: '#20cf9b',
  },
});

export default ItemForm;
