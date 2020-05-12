import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useSelector } from 'react-redux';

import { dashBoardStyles } from './dashBoardStyles.ts';

const UserProfile = () => {
  const loggedUser = useSelector((state) => state.user.userInfo);

  const [currTime, setCurrTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const time = setInterval(() => {
      setCurrTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(time);
  });

  return (
    <View style={dashBoardStyles.container}>
      <View style={dashBoardStyles.imageStackStack}>
        <View style={dashBoardStyles.imageStack}>
          <ImageBackground
            source={require('../../../assets/images/background.png')}
            resizeMode="cover"
            style={dashBoardStyles.image}
            imageStyle={dashBoardStyles.image_imageStyle}
          />
        </View>
        <View style={dashBoardStyles.edit_profile}>
          <Text style={dashBoardStyles.edit_button}>Edit profile</Text>
        </View>
      </View>
      <View style={dashBoardStyles.metadata}>
        <View style={dashBoardStyles.location_container}>
          <Text style={dashBoardStyles.location}>New York, NY</Text>
        </View>
        <View style={dashBoardStyles.time_container}>
          <Text style={dashBoardStyles.time}>{currTime}</Text>
        </View>
      </View>
      <Text style={dashBoardStyles.welcome}>Welcome {loggedUser.email}</Text>
    </View>
  );
};

export default UserProfile;
