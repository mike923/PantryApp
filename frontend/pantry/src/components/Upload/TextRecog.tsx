import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { utils } from '@react-native-firebase/app';
import vision from '@react-native-firebase/ml-vision';
import { ScrollView, Text, Button, Alert } from 'react-native';

const TextRecog = ({ route, navigation }) => {
  const { localUriPath } = route.params;

  const [text, setText] = useState([]);

  useEffect(() => {
    if (localUriPath) {
      processImg();
    } else {
      errorAlert();
    }
    // localUriPath ? processImg : errorAlert;
  }, []);

  console.log(`Local Path for TextRecog Component: `, localUriPath);

  const processImg = async () => {
    const processedText = await vision().textRecognizerProcessImage(
      localUriPath,
    );

    console.log(`Processed Text: `, processedText);

    const textJsxArr = processedText.blocks.map((block) => {
      console.log(`Text Block: `, block.text);
      console.log(`Confidence: `, block.confidence);
      // console.log(`Language: `, block.recognizedLanguages);
      return textDisplay(block.text);
    });

    setText(textJsxArr);
  };

  const errorAlert = () => Alert.alert(`Choose Photo first`);

  const textDisplay = (block) => <Text>{block}</Text>;

  return (
    <ScrollView>
      <Button
        title={localUriPath ? 'Parsed Receipt' : 'Choose Photo First'}
        onPress={localUriPath ? processImg : errorAlert}
        color="green"
      />
      {text}
    </ScrollView>
  );
};

export default TextRecog;
