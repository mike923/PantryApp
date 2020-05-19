import React, { useState, useEffect, Props } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { utils } from '@react-native-firebase/app';
import vision from '@react-native-firebase/ml-vision';
import { ScrollView, Text, Button, Alert } from 'react-native';
import axios from 'axios';
import { dummy } from '../../../dummydata';
import algoRythm1 from './parsingTest/recieptText2';
import ItemConfirmation from './ItemConfirmation.tsx';
import { PROXY } from '../../../proxy';

const TextRecog = ({ route, navigation }: Props) => {
  const { localUriPath, firebaseImageURL } = route.params;
  const [text, setText] = useState({ receipt_url: null });

  useEffect(() => {
    localUriPath ? processImg() : Alert.alert(`Choose Photo first`);
  }, []);

  console.log(`Local Path for TextRecog Component: `, localUriPath);

  const processImg = async () => {
    const processedText = await vision().textRecognizerProcessImage(
      localUriPath,
    );

    console.log(`Processed Text: `, processedText);

    const items = await algoRythm1(processedText.text);
    console.log(`Items: `, items);
    setText({ receipt_url: firebaseImageURL, ...items });

    // const textJsxArr = processedText.blocks.map((block) => {
    //   console.log(`Text Block: `, block.text);
    //   console.log(`Confidence: `, block.confidence);
    //   // console.log(`Language: `, block.recognizedLanguages);
    //   return <Text>{block.text}</Text>;
    // });

    // setText(textJsxArr);
  };

  const sendData = async () => {
    let receipt_json = dummy;
    try {
      const { data } = await axios.post(
        `${PROXY}/receipts/upload`,
        receipt_json,
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const goToParsed = () => {
    navigation.navigate('Confirmation', { parsedText: text });
  };

  return (
    <ScrollView>
      {/* {text} */}
      {text.receipt_url ? (
        <ItemConfirmation navigation={navigation} parsedReceipt={text} />
      ) : null}
      {/* {text ? (
        <Button title="Confirmation" onPress={goToParsed} color="green" />
      ) : null}
      <Button title="Submit" onPress={sendData} color="green" /> */}
    </ScrollView>
  );
};

TextRecog.navigationOptions = ({ navigation }) => ({
  title: 'Parsed',
  // headerShown: false,
});

export default TextRecog;
