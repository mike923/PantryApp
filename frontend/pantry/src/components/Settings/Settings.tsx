import React from 'react';
import { View, Text, Image } from 'react-native';

const Settings = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        style={{ height: 320, width: 320, alignSelf: 'center' }}
        source={require('../../../assets/images/error-404-colour-1200px.png')}
      />
      <Text style={{ fontSize: 45 }}>Work in Progress</Text>
    </View>
  );
};

export default Settings;
