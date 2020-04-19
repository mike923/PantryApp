import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ImageBackground } from 'react-native';

const Welcome = (props: any) => (
  <View style={styles.container}>
    <ImageBackground
      source={require('../../../assets/images/backgroundskinny.png')}
      resizeMode="contain"
      style={styles.image}
      imageStyle={styles.image_imageStyle}>
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
  container: {
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
  image: {
    height: 894,
    marginLeft: -2,
    width: 418,
  },
  image_imageStyle: {},
  logo: {
    alignSelf: 'center',
    height: 297,
    marginVertical: 151,
    width: 378,
  },
});

export default Welcome;
