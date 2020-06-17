import React, { useState, useEffect } from 'react';
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles.ts';
import { updatePantryItems } from '../../redux/actions/pantryActions.ts';

import { client } from '../../../proxy';

const FoodDetailed = (props: any) => {
  // console.log(props);
  // const params = { ...props.route.params, edited: false };
  // params. = new Date(params.purchased_date).toDateString();
  const dispatch = useDispatch();
  const { item_id, index } = props.route.params;
  const [state, setState] = useState({
    loaded: false,
    edited: false,
    item_id,
  });
  const [dateModal, setDateModal] = useState(false);
  const [date, setDate] = useState('');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setState({
      ...state,
      purchased_date: selectedDate,
      edited: true,
    });
  };

  console.log(`HERE`, state);

  useEffect(() => {
    const apiCall = async () => {
      try {
        const { data } = await client.get(`/fooditem/itemid/${state.item_id}`);

        console.log(
          'dbwfbta',
          Date.parse(data.payload.purchased_date.split(' ')[0]),
        );

        setDate(new Date(data.payload.purchased_date.split(' ')[0]));
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
  console.log('sdgw', typeof date);

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
      <Text style={styles.date}>Purchased: {date.toDateString()}</Text>
      <TouchableOpacity
        onPress={() => {
          setDateModal(!dateModal);
          setShow(true);
        }}>
        <Text>Change Date</Text>
      </TouchableOpacity>
      <View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour
            display="default"
            onChange={onChange}
          />
        )}
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
