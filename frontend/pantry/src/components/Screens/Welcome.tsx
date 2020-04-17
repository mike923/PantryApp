import React, { Component } from "react";
import { StyleSheet, View, Image, Text, StatusBar } from "react-native";

const Welcome = (props: any) => (
    <View style={styles.container}>
        <Image
            source={require("../../../assets/images/untitled.png")}
            resizeMode="contain"
            style={styles.image2}
        ></Image>
        <Text style={styles.heading}>Welcome To Pantry</Text>
        <StatusBar></StatusBar>
    </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(15,15, 15,0)"
  },
  image2: {
    width: 378,
    height: 297,
    marginVertical: 151,
    alignSelf: "center"
  },
  heading: {
    width: 414,
    height: 61,
    color: "rgba(255,0,149,1)",
    fontSize: 50,
    fontFamily: "Vibur",
    textAlign: "center",
    marginBottom: 327
  },
});

export default Welcome;