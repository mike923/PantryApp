import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  Text,
  Keyboard,
  Platform,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TextInput } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { client } from '../../../proxy';
// import { style } from '../Navigation/style';

const FoodDetailed = (props) => {
  const { goTo, index, ...foodProp } = props.route.params;
  const [foodItem, setFoodItem] = useState(foodProp);
  console.log(props);
  const [editable, allowEdit] = useState(false);
  const [datePicker, showDatePicker] = useState(false);
  const [updatedDate, changeDate] = useState(new Date());
  const [additionalDetails, setAdditionalDetails] = useState(null);

  useEffect(() => {
    const apiCall = async () => {
      const { data } = await client
        .get(`/fooditem/itemid/${foodItem.item_id}`)
        .catch((error) => setAdditionalDetails(error.message));

      console.log(data);
      setAdditionalDetails(data.details);
    };
    apiCall();
  }, [additionalDetails]);

  const postUpdatedCopy = async () => {
    const data = await client.patch(
      `/fooditem/update/${foodItem.item_id}`,
      foodItem,
    );

    props.navigation.goBack();
    console.log(data);
    console.log('DEEZ');
    allowEdit(false);
  };

  const renderFoodItem = () => {
    // class RenderedDate {
    //   constructor() {
    //     this.date =
    //   }
    // }

    const obj = (label, i) => ({ label, index: i });
    const friendlyLabels = {
      purchased_date: obj('Date Purchased', 0),
      perished_date: obj('Perish Date', 1),
      receipt_date: obj('Receipt Date', 2),
      price: obj('Price', 3),
      time_modified: obj('Last Modified', 5),
      time_posted: obj('Date Uploaded', 6),
      upc: obj('UPC/GTIN', 7),
      quantity: obj('Quantity', 8),
      finished: obj('Finished', 9),
    };

    let renderedFoodItem = Object.keys(foodItem)
      .map((itemProperty) => ({
        ...friendlyLabels[itemProperty],
        value: foodItem[itemProperty],
        name: itemProperty,
      }))
      .filter((input) => input.label)
      .map((itemProperty, j) => {
        const i = j;
        let fecha;
        switch (itemProperty.name) {
          case 'perished_date':
            fecha = itemProperty.value || new Date();
            return (
              <View style={{ flex: 1 }} key={i + 1}>
                <View style={style.inputContainer}>
                  <Text style={[style.textInput, style.inputLabel]}>
                    {itemProperty.label}
                  </Text>
                  <TouchableOpacity
                    style={{ flex: 1 }}
                    onPress={() => {
                      if (!editable) {
                        allowEdit(true);
                        showDatePicker(true);
                      } else {
                        showDatePicker(!datePicker);
                      }
                    }}>
                    <Text
                      style={[style.textInput, editable ? style.editable : {}]}>
                      {(editable && datePicker && 'Cancel') ||
                        (itemProperty.value &&
                          itemProperty.value.toDateString()) ||
                        'Date Not Set'}
                    </Text>
                  </TouchableOpacity>
                  {editable && datePicker && (
                    <TouchableOpacity
                      style={{ flex: 1 }}
                      onPress={() => {
                        showDatePicker(false);
                        setFoodItem({
                          ...foodItem,
                          [itemProperty.name]: updatedDate,
                        });
                      }}>
                      <Text
                        style={[
                          style.textInput,
                          editable ? style.editable : {},
                        ]}>
                        Set Date
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                {editable && datePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    mode="date"
                    is24Hour
                    display="default"
                    value={fecha}
                    onChange={(event, selectedDate) => {
                      showDatePicker(Platform.OS === 'ios');
                      changeDate(selectedDate);
                      if (Platform.OS !== 'ios')
                        setFoodItem({
                          ...foodItem,
                          [itemProperty.name]: updatedDate,
                        });
                    }}
                  />
                )}
              </View>
            );
          case 'purchased_date':
          case 'receipt_date':
          case 'time_modified':
          case 'time_posted':
            fecha = new Date(itemProperty.value).toDateString();
            if (fecha === 'Invalid Date') fecha = 'Unavailable';
            return (
              <View style={style.inputContainer} key={i + 1}>
                <Text style={[style.textInput, style.inputLabel]}>
                  {itemProperty.label}
                </Text>
                <TextInput
                  style={style.textInput}
                  value={`${fecha}`}
                  editable={false}
                />
              </View>
            );
          case 'finished':
          default:
            return (
              <View style={style.inputContainer} key={i + 1}>
                <Text style={[style.textInput, style.inputLabel]}>
                  {itemProperty.label}
                </Text>
                <TextInput
                  style={[style.textInput, editable ? style.editable : {}]}
                  value={`${itemProperty.value}`}
                  editable={editable}
                  onChangeText={(text) =>
                    setFoodItem({ ...foodItem, [itemProperty.name]: text })
                  }
                />
              </View>
            );
        }
      });

    return renderedFoodItem;
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <TextInput
          style={[
            style.textInput,
            style.foodName,
            editable ? style.editable : {},
          ]}
          value={foodItem.preferred_name}
          onChangeText={(text) =>
            setFoodItem({ ...foodItem, preferred_name: text })
          }
          editable={editable}
        />
        <TouchableOpacity
          style={style.editButton}
          onPress={() => (!editable ? allowEdit(true) : postUpdatedCopy())}
          // disabled={editable}
        >
          <FeatherIcon
            name={editable ? 'check' : 'edit-2'}
            style={style.editIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={style.imgContainer}>
        <Image
          source={{ uri: foodItem.img_url }}
          resizeMode="contain"
          style={style.image}
        />
      </View>
      <ScrollView style={style.foodItemContainer}>
        {renderFoodItem()}
        {}
      </ScrollView>
      {/* <TouchableOpacity onPress={() => console.log(foodItem)}>
        <Text>Hello world</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  editButton: {
    padding: 10,
  },
  editIcon: {
    flex: 1,
    fontSize: 30,
  },
  editable: {
    backgroundColor: '#efefef',
  },
  foodItemContainer: {
    flex: 1,
    marginTop: 20,
    width: '95%',
  },
  foodName: {
    fontSize: 25,
  },
  header: {
    alignItems: 'flex-start',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 25,
  },
  image: {
    backgroundColor: 'white',
    borderRadius: 5,
    height: '100%',
    padding: 10,
    width: '100%',
  },
  imgContainer: {
    elevation: 3,
    height: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 3.22,
    width: '90%',
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  inputLabel: {
    flex: 0,
    width: '30%',
  },
  textInput: {
    flex: 1,
    margin: 2,
    marginRight: 10,
    padding: 10,
    fontSize: 18,
  },
});

export default FoodDetailed;
