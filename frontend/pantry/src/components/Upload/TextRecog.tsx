import React, { useState, useEffect, Props, useRef } from 'react';
import vision from '@react-native-firebase/ml-vision';
import { ScrollView, Text, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { dummy } from '../../../dummydata';
import { parseReceipt } from '../../redux/actions/textRecogActions.ts';

import algoRythm1 from './parsingTest/receiptText2.ts';
import ItemConfirmation from './ItemConfirmation.tsx';
import { client } from '../../../proxy';

const TextRecog = ({ route, navigation }: Props) => {
  // connect redux state tot component
  const receipt: any = useSelector((state) => state.recog.receipt);
  const dispatch = useDispatch();

  const { localUriPath, firebaseImageURL } = route.params;
  // const [text, setText] = useState({ receipt_url: null });

  useEffect(() => {
    localUriPath ? processImg() : Alert.alert(`Choose Photo first`);
  }, []);
  console.log('recognition', receipt);

  console.log(`Local Path for Texeiptreceipt Component: `, localUriPath);

  const processImg = async () => {
    const processedText = await vision().textRecognizerProcessImage(
      localUriPath,
    );

    console.log(`Processed Text: `, processedText);

    const items = await algoRythm1(processedText.text);
    console.log(`Items: `, items);
    dispatch(parseReceipt({ receipt_url: firebaseImageURL, ...items })); // setting redux state with result from parsing
    // setText({ receipt_url: firebaseImageURL, ...items });
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
      const { data } = await client.post('/receipts/upload', receipt_json);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const goToParsed = () => {
    navigation.navigate('Confirmation');
  };

  return (
    <ScrollView>
      {/* {text} */}
      {receipt.receipt_url ? (
        <ItemConfirmation navigation={navigation} />
      ) : null}
      {/* {text ? (
        <Button title="Confirmation" onPress={goToParsed} color="green" />
      ) : null}
      <Button title="Submit" onPress={sendData} color="green" /> */}
    </ScrollView>
  );
};

TextRecog.navigationOptions = ({ navigation }: any) => ({
  title: 'Parsed',
  // headerShown: false,
});

export default TextRecog;
