import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';

const FoodDetailed = (props: any) => {
  const params = { ...props.route.params };
  params.purchasedDate = new Date(params.purchasedDate).toDateString();
  const [state, setState] = useState(params);
  const { productName, purchasedDate, uri, quantity } = state;
  const [dateModal, setDateModal] = useState(false);
  console.log(state);

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.name}
        value={state.productName}
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
          value={`${state.quantity}`}
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
      <Text style={styles.date}>{state.purchasedDate}</Text>
      <TouchableOpacity onPress={() => setDateModal(!dateModal)}>
        <Text>Change Date</Text>
      </TouchableOpacity>
      <View>
        <Modal animationType="slide" visible={dateModal} transparent>
          <View style={styles.modalView}>
            <DatePicker
              date={new Date(state.purchasedDate)}
              mode="date"
              onDateChange={(newDate) =>
                setState({ ...state, purchasedDate: newDate.toDateString() })
              }
              style={styles.datePicker}
            />
            <TouchableHighlight
              onPress={() => setDateModal(!dateModal)}
              style={styles.modalDoneBtn}>
              <Text style={styles.modalDoneBtnText}>Done</Text>
            </TouchableHighlight>
          </View>
        </Modal>
      </View>
      <TouchableOpacity>
        <Text>Submit</Text>
      </TouchableOpacity>
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
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
  },
  img: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: '40%',
    padding: 10,
    width: '100%',
  },
  modalDoneBtn: {
    backgroundColor: 'orange',
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  modalDoneBtnText: {
    color: 'white',
    fontSize: 20,
  },
  modalView: {
    alignItems: 'center',
    elevation: 5,
    flex: 1,
    height: 50,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
