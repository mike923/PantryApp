import React, { Component } from "react";
import { StyleSheet, View, Image, Text, StatusBar } from "react-native";
import MapView from "react-native-maps";

const Welcome = (props: any) => (
    <View style={styles.container}>
        <Image
            source={require("../../../assets/images/untitled.png")}
            resizeMode="contain"
            style={styles.image2}
        ></Image>
        <View style={styles.image2Filler}></View>
        <Text style={styles.heading}>Welcome To Pantry</Text>
        <StatusBar></StatusBar>
        <MapView
        provider={MapView.PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        customMapStyle={[]}
        style={styles.mapView}
      ></MapView>
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
    marginTop: 151,
    alignSelf: "center"
  },
  image2Filler: {
    flex: 1
  },
  heading: {
    width: 414,
    height: 61,
    color: "rgba(255,0,149,1)",
    fontSize: 50,
    fontFamily: "Vibur",
    lineHeight: 50,
    textAlign: "center",
    marginBottom: 327
  },
  mapView: {
    height: 645,
    width: 414
  }
});

export default Welcome;