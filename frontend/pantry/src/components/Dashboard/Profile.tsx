import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { dashBoardStyles } from './dashBoardStyles.ts';

const UserProfile = () => {
  const loggedUser: any = useSelector((state: any) => state.user.userInfo);

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
      </View>
      <View style={dashBoardStyles.metadata}>
        <Text style={dashBoardStyles.location}>New York, NY</Text>
        <Text style={dashBoardStyles.time}>{currTime}</Text>
      </View>
      <Text style={dashBoardStyles.welcome}>
        Welcome {loggedUser.email.split('@')[0]}
      </Text>
    </View>
  );
};

export default UserProfile;
