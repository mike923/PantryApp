import React, { useState, useEffect } from 'react';
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
import axios from 'axios';

import { IP_ADDRESS } from 'react-native-dotenv';

const updateFood = `http://${IP_ADDRESS}:4004/fooditem/update`;

const FoodDetailed = (props: any) => {
  console.log(props);
  // const params = { ...props.route.params, edited: false };
  // params. = new Date(params.receipt_date).toDateString();
  const item_id = props.route.params.item_id;
  const receipt_date = props.route.params.receipt_date;
  const [state, setState] = useState({ loaded: false, edited: false, item_id, receipt_date });
  const [dateModal, setDateModal] = useState(false);
  console.log(`HERE`, state);

  useEffect(() => {
    const apiCall = async () => {
      try {
        const { data } = await axios.get(
          `http://${IP_ADDRESS}:4004/fooditem/itemid/${state.item_id}`,
        );
        console.log(data);
        setState({ ...state, ...data.payload[0], loaded: true });
      } catch (err) {
        console.log(err);
      }
    };
    apiCall();
  }, []);

  const handleSubmit = async () => {
    // IF DATE CHANGED UPDATE DATE FINISHED COLUMN
    console.log(`Submitted`, state);
    const data = await axios.patch(`${updateFood}/${state.item_id}`, state);
    props.navigation.goBack();
  };

  return state.loaded ? (
    <View style={styles.container}>
      <TextInput
        style={styles.name}
        value={state.name}
        onChangeText={(text) =>
          setState({ ...state, name: text, edited: true })
        }
        editable
      />
      <Image
        source={{ uri: state.img_url }}
        resizeMode="contain"
        style={styles.img}
      />
      <View style={styles.quantityContainer}>
        <FeatherIcon
          name="minus-circle"
          size={26}
          color="black"
          onPress={() =>
            setState({ ...state, quantity: state.quantity - 1, edited: true })
          }
        />
        <TextInput
          style={styles.quantity}
          value={`${state.quantity}`}
          onChangeText={(text) =>
            setState({ ...state, quantity: text, edited: true })
          }
          keyboardType="number-pad"
          returnKeyType="done"
          editable
        />
        <FeatherIcon
          name="plus-circle"
          size={26}
          color="black"
          onPress={() =>
            setState({ ...state, quantity: state.quantity + 1, edited: true })
          }
        />
      </View>
      <Text style={styles.date}>{state.receipt_date}</Text>
      <TouchableOpacity onPress={() => setDateModal(!dateModal)}>
        <Text>Change Date</Text>
      </TouchableOpacity>
      <View>
        <Modal animationType="slide" visible={dateModal} transparent>
          <View style={styles.modalView}>
            <DatePicker
              date={new Date(state.receipt_date)}
              mode="date"
              onDateChange={(newDate) =>
                setState({
                  ...state,
                  receipt_date: newDate.toDateString(),
                  edited: true,
                })
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
      {state.edited ? (
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  ) : null;
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
    height: 200,
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
    fontSize: 24,
  },
  modalView: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
  submitBtn: {
    backgroundColor: 'orange',
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  submitBtnText: {
    color: 'white',
    fontSize: 20,
  },
});

export default FoodDetailed;
