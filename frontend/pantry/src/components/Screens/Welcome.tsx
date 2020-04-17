import React, { Component } from "react";
import { StyleSheet, View, Image, Text } from "react-native";

const Welcome = (props: any) => (
    <View style={styles.container}>
        <Image
            source={require("../../../assets/images/untitled.png")}
            resizeMode="contain"
            style={styles.image2}
        ></Image>
        <Text style={styles.heading}>Welcome To Pantry</Text>
    </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(15,15, 15,0)",
    borderColor: "#FF5A5F",
    borderWidth: 5,
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
    color: "#FF5A5F",
    fontSize: 50,
    fontFamily: "Vibur",
    textAlign: "center",
    marginBottom: 327
  },
});

export default Welcome;