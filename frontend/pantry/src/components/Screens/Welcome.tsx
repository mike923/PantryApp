import React, { Component } from "react";
import { StyleSheet, View, Image, Text, ImageBackground } from "react-native";

const Welcome = (props: any) => (
  <View style={styles.container}>
    <ImageBackground
      source={require("../../../assets/images/background.png")}
      resizeMode="contain"
      style={styles.background}
    >
      <Image
          source={require("../../../assets/images/logo.png")}
          resizeMode="contain"
          style={styles.logo}
      ></Image>
      <Text style={styles.heading}>Welcome To Pantry</Text>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(15,15, 15,0)",
  },
  background: {
    flex: 1,
  },
  logo: {
    width: 378,
    height: 297,
    marginVertical: 151,
    alignSelf: "center"
  },
  heading: {
    width: 414,
    height: 90,
    color: "#FFF",
    fontSize: 60,
    fontFamily: "Vibur",
    textAlign: "center",
    marginBottom: 327
  },
});

export default Welcome;