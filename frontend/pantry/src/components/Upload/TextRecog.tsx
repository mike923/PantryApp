import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { utils } from '@react-native-firebase/app';
import vision from '@react-native-firebase/ml-vision';
import { ScrollView, Text, Button, Alert } from 'react-native';
import axios from 'axios';
import { dummy } from '../../../dummydata';
import algoRythm1 from './parsingTest/recieptText2';
import ItemConfirmation from './ItemConfirmation.tsx';

const TextRecog = ({ route, navigation }) => {
  const { localUriPath } = route.params;
  const [text, setText] = useState(null);

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
    setText(items);

    const textJsxArr = processedText.blocks.map((block) => {
      console.log(`Text Block: `, block.text);
      console.log(`Confidence: `, block.confidence);
      // console.log(`Language: `, block.recognizedLanguages);
      return <Text>{block.text}</Text>;
    });

    setText(textJsxArr);
  };

  const sendData = async () => {
    let receipt_json = dummy;
    try {
      const {
        data: { payload },
      } = await axios.post(
        'http://localhost:8282/receipts/upload',
        receipt_json,
      );
      console.log(payload);
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
      {text ? (
        <ItemConfirmation navigation={navigation} parsedReceipt={text} />
      ) : null}
      {text ? (
        <Button title="Confirmation" onPress={goToParsed} color="green" />
      ) : null}
      <Button title="Submit" onPress={sendData} color="green" />
    </ScrollView>
  );
};

TextRecog.navigationOptions = ({ navigation }) => ({
  title: 'Parsed',
  // headerShown: false,
});

export default TextRecog;
