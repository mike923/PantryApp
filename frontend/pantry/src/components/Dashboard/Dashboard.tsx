import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import Breakfast from '../../../assets/images/breakfast-colour.svg';

const Dashboard = ({ navigation }: any) => {
  const [currTime, setCurrTime] = useState(new Date().toLocaleString());
  const loggedUser: any = useSelector((state: any) => state.user.userInfo);
  const navigationButtonOptions = [
    { goTo: 'Receipts', innerText: 'Receipts' },
    { goTo: 'Health', innerText: 'Health' },
    { goTo: 'Settings', innerText: 'Authorized Users' },
    { goTo: 'Settings', innerText: 'Settings' },
  ];

  const buildDate = () => {
    let weekDayObj: any = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

    let dateObj = new Date();
    let month = dateObj.getMonth();
    let date = dateObj.getDate();
    let day = dateObj.getDay();
    console.log('date', day);
    let year = dateObj.getFullYear();

    return setCurrTime(`${weekDayObj[day]} ${month + 1}/${date}/${year}`);
  };

  useEffect(() => {
    buildDate();
  }, []);

  let num = 0;
  return (
    <View style={style.container}>
      <ImageBackground
        source={require('../../../assets/images/background.png')}
        style={style.imageView}
        imageStyle={style.imageStyle}>
        <SafeAreaView style={style.dashboardWelcomeContainer}>
          <Text style={[style.welcome, { marginTop: 10 }]}>
            Hello {loggedUser.email.split('@')[0]}
          </Text>
          <Text style={style.welcome}>What&apos;s in your Pantry</Text>
          <View style={style.metadata}>
            <Text style={style.timeAndLocation}>New York, NY</Text>
            <Text style={style.timeAndLocation}>{currTime}</Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
      <View style={style.navContainer}>
        <ScrollView>
          {navigationButtonOptions.map(({ goTo, innerText }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(goTo)}
              style={style.navButton}
              key={innerText}>
              <Text key={num + 1} style={style.buttonText}>
                {innerText}
              </Text>
              <Icon key={num + 2} name="chevron-right" style={style.chevron} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Breakfast style={style.breakfastImage} />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  breakfastImage: {
    alignSelf: 'center',
    height: '95%',
    position: 'absolute',
    width: '95%',
    zIndex: -1,
    // marginVertical: 'auto',
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
  },
  chevron: {
    fontSize: 15,
  },
  container: {
    flex: 1,
  },
  dashboardWelcomeContainer: {
    flex: 1,
    // paddingTop: 100
  },
  imageStyle: {
    height: '100%',
  },
  imageView: {
    height: '25%',
    resizeMode: 'cover',
  },
  metadata: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fcf7f460',
    // opacity: 0.2,
    borderRadius: 1,
    marginVertical: 1,
    padding: 12,
    paddingLeft: 25,
    width: '100%',
    height: 60,
    // zIndex: 9,
  },
  navContainer: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 15,
  },
  timeAndLocation: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
    marginTop: 10,
  },
  welcome: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 30,
    marginBottom: 20,
  },
});

export default Dashboard;
