import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import DatePicker from 'react-native-date-picker';
import { useDispatch } from 'react-redux';
import styles from './styles.ts';
import { updatePantryItems } from '../../redux/actions/pantryActions.ts';

import { client } from '../../../proxy';

const FoodDetailed = (props: any) => {
  // console.log(props);
  // const params = { ...props.route.params, edited: false };
  // params. = new Date(params.receipt_date).toDateString();
  const dispatch = useDispatch();
  const { item_id, index } = props.route.params;
  const { receipt_date } = props.route.params;
  const [state, setState] = useState({
    loaded: false,
    edited: false,
    item_id,
    receipt_date,
  });
  const [dateModal, setDateModal] = useState(false);

  console.log(`HERE`, state);

  useEffect(() => {
    const apiCall = async () => {
      try {
        const { data } = await client.get(`/fooditem/itemid/${state.item_id}`);
        console.log(data);
        setState({ ...state, ...data.payload, loaded: true });
      } catch (err) {
        console.log(err);
      }
    };
    apiCall();
  }, []);

  const handleSubmit = async () => {
    // IF DATE CHANGED UPDATE DATE FINISHED COLUMN
    console.log(`Submitted`, state);
    const data = await client.patch(`/fooditem/update/${state.item_id}`, state);
    console.log(data);
    // await dispatch(updatePantryItems(index, state.preferred_name));
    props.navigation.goBack();
  };

  return state.loaded ? (
    <View style={styles.container}>
      <TextInput
        style={styles.name}
        value={state.preferred_name}
        onChangeText={(text) => {
          dispatch(updatePantryItems(index, text));
          setState({ ...state, preferred_name: text, edited: true });
        }}
        editable
      />
      <View style={styles.imgContainer}>
        <Image
          source={{ uri: state.img_url }}
          resizeMode="contain"
          style={styles.img}
        />
      </View>
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

export default FoodDetailed;
