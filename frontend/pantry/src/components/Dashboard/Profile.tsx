import React, { useEffect, useState } from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { useSelector } from 'react-redux';

import { profileStyles } from './dashBoardStyles.ts';

const UserProfile = () => {
  const loggedUser: any = useSelector((state: any) => state.user.userInfo);

  const [currTime, setCurrTime] = useState(new Date().toLocaleString());

  const buildDate = () => {
    let weekDayObj: any = {
      '1': 'Mon',
      '2': 'Tues',
      '3': 'Wed',
      '4': 'Thurs',
      '5': 'Fri',
      '6': 'Sat',
      '7': 'Sun',
    };

    let dateObj = new Date();
    let month = dateObj.getMonth();
    let date = dateObj.getDate();
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();

    return setCurrTime(`${weekDayObj[day]} ${month + 1}/${date}/${year}`);
  };

  useEffect(() => {
    buildDate();
  }, []);

  return (
    <View style={profileStyles.container}>
      <View style={profileStyles.imageStackContainer}>
        <View style={profileStyles.imageStack}>
          <ImageBackground
            source={require('../../../assets/images/background.png')}
            resizeMode="cover"
            style={profileStyles.image}
            imageStyle={profileStyles.image_imageStyle}
          />
        </View>
      </View>
      <View style={profileStyles.metadata}>
        <Text style={profileStyles.location}>New York, NY</Text>
        <Text style={profileStyles.time}>{currTime}</Text>
      </View>
      <Text style={profileStyles.welcome}>
        Welcome {loggedUser.email.split('@')[0]}
      </Text>
    </View>
  );
};

export default UserProfile;
