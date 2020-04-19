import React from 'react';
import { StyleSheet, View, Image, Text, ImageBackground } from 'react-native';

const WelcomeScreen = (props: any) => (
  <View style={styles.container}>
    <ImageBackground
      source={require('../../../assets/images/background.png')}
      resizeMode="contain"
      style={styles.background}>
      <Image
        source={require('../../../assets/images/logo.png')}
        resizeMode="contain"
        style={styles.logo}
      />
      <Text style={styles.heading}>Welcome To Pantry</Text>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    backgroundColor: 'rgba(15,15, 15,0)',
    flex: 1,
  },
  heading: {
    color: '#FFF',
    fontFamily: 'Vibur',
    fontSize: 60,
    height: 90,
    marginBottom: 327,
    textAlign: 'center',
    width: 414,
  },
  logo: {
    alignSelf: 'center',
    height: 297,
    marginVertical: 151,
    width: 378,
  },
});

export default WelcomeScreen;
