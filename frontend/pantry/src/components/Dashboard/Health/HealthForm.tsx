import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { emptyCart } from '../../ShoppingCart/cartStyles.ts';

const HealthFrom = () => {
  const [formFields, setFormFields] = useState([{ value: '' }]);

  const onChangeText = (text: any, index: any) => {
    const existingFormFields = [...formFields];

    existingFormFields[index].value = text;
    setFormFields(existingFormFields);
  };

  console.log(formFields);

  return (
    <View style={styles.container}>
      <Text style={styles.banner}>Please enter any health conditions</Text>
      <ScrollView>
        {formFields.map((field, index) => {
          return (
            <View key={index}>
              <TextInput
                style={styles.textInput}
                placeholder="Condition"
                placeholderTextColor="black"
                value={field.value}
                onChangeText={(text) => onChangeText(text, index)}
              />
            </View>
          );
        })}
        <TouchableOpacity
          style={[styles.addButton, styles.button]}
          onPress={() => setFormFields([...formFields, { value: '' }])}>
          <Text style={emptyCart.cameraLaunchButtonText}>Add New Form</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.submitButton, styles.button]}
          onPress={() => {
            console.log('hi');
          }}>
          <Text style={emptyCart.cameraLaunchButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HealthFrom;

const styles = StyleSheet.create({
  banner: {
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 25,
    borderBottomWidth: 3,
    paddingBottom: 10,
    borderBottomColor: 'black',
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'rgb(255, 92, 97)',
    borderRadius: 5,
    elevation: 2,
    height: 58,
    justifyContent: 'center',
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    alignSelf: 'center',
    marginTop: 25,
    width: 200,
  },
  container: { flex: 1, backgroundColor: 'white' },
  textInput: {
    height: 50,
    backgroundColor: 'lightgray',
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    width: 386,
    alignSelf: 'center',
  },
});
