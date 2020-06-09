import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Keyboard,
} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import FeatherIcons from 'react-native-vector-icons/Feather';
import { ActionSheet, Root } from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';

import { FireBaseStorage } from '../../firebase/firebase';
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

  const [uploadImage, setUploadImage] = useState(false);
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

  const TextInputRow = (input: any) => {
    const { name, index, value } = input;

    return (
      <View key={index} style={style.input}>
        <TextInput
          style={style.inputLabel}
          value={name}
          placeholder={value ? '' : 'label'}
          placeholderTextColor="#ccc"
          editable={index >= 6}
          onChangeText={(text) => handleChange(input, 'name', text)}
        />
        <TextInput
          style={style.inputValue}
          multiline={index === 5}
          value={index === 5 ? `Choose Photo Above` : `${value}`}
          placeholder={value ? '' : 'input value'}
          placeholderTextColor="#ccc"
          editable={index !== 5}
          onChangeText={(text) => handleChange(input, 'value', text)}
        />
        {index >= 6 && (
          <TouchableOpacity
            style={style.delete}
            onPress={() => {
              let copyOfFoodItem = [...foodItem];
              copyOfFoodItem.splice(index, 1);
              console.log(copyOfFoodItem);
              copyOfFoodItem = copyOfFoodItem.map((inputCopy, arrayIndex) => ({
                ...inputCopy,
                index: arrayIndex,
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

  const setImage = (image) => {
    setUploadImage({
      id: Date.now(),
      url: {
        uri: image.path,
      },
      content: image.data,
    });

    FireBaseStorage.ref(image.fileName ? image.fileName : 'userimage')
      .putFile(image.path)
      .on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          );
          console.log(`Uploading progress: `, `${progress}%`);
          // setUpload({ loading: true, progress });
        },
        (error) => {
          console.log(error);
        },
        (completed) => {
          console.log(`Upload Completed`);
          completed.ref.getDownloadURL().then((url) => {
            console.log(`Firebase Hosted Url`, url);
            let copyOfFoodItem = [...foodItem];
            copyOfFoodItem[5].value = url;
            setFoodItem(copyOfFoodItem);
          });
        },
      );
    return image;
  };

  const addImage = () => {
    const imageOptions = { width: 300, height: 300, cropping: true };
    const cancelButtonIndex = uploadImage ? 3 : 2;
    let options = ['Take Photo', 'Choose Photo', 'Cancel'];
    if (uploadImage) options.splice(2, 0, 'Remove Photo');

    ActionSheet.show(
      { options, cancelButtonIndex, title: 'Select a Photo' },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            ImagePicker.openCamera(imageOptions).then(setImage);
            break;
          case 1:
            ImagePicker.openPicker(imageOptions).then(setImage);
            break;
          case 2:
            setUploadImage(false);
            break;
          case 3:
            setUploadImage(false);
            break;
          default:
            break;
        }
      },
    );
  };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={88}
        style={style.outerContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView style={style.innerContainer}>
            <Root>
              <TouchableOpacity style={style.imageContainer} onPress={addImage}>
                {uploadImage ? (
                  <Image
                    source={uploadImage ? uploadImage.url : foodItem[5].value}
                    style={style.itemImage}
                  />
                ) : (
                  <FeatherIcons name="image" style={style.uploadImageIcon} />
                )}
              </TouchableOpacity>
            </Root>
            {foodItem.map((input) => TextInputRow(input))}
            <TouchableOpacity style={style.button} onPress={addNewInput}>
              <Text style={style.buttonText}>Add Input</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[style.button, style.submit]}
              onPress={submit}>
              <Text style={style.buttonText}>Submit Form</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

const { width } = Dimensions.get('window');

const style = StyleSheet.create({
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#ff5c61',
    borderRadius: 50,
    marginVertical: 10,
    padding: 12,
    width: '75%',
  },
  buttonText: {
    color: '#fff',
    fontFamily: 'DINPro',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    aspectRatio: 1,
    backgroundColor: '#ff5c61',
    borderRadius: 25,
    elevation: 3,
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20,
    marginHorizontal: 25,
    marginTop: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.35,
    shadowRadius: 2.22,
    width: '90%',
  },
  innerContainer: {
    // flex: 1,
    // // alignItems: 'center',
    // margin: 25,
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
  itemImage: {
    backgroundColor: '#2f455c',
    borderRadius: 25,
    height: '100%',
    resizeMode: 'contain',
    width: '100%',
  },
  outerContainer: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 25,
  },
  submit: {
    backgroundColor: '#20cf9b',
  },
  uploadImageIcon: {
    color: 'white',
    fontSize: width * 0.75,
    marginTop: 5,
  },
});

export default ItemForm;
