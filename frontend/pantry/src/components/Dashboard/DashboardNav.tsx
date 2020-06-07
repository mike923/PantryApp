import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { dashBoardStyles, profileStyles } from './dashBoardStyles.ts';
import Breakfast from '../../../assets/images/breakfast-colour.svg';

const Dashboard = ({ navigation }) => {
  return (
    <View style={profileStyles.navContainer}>
      <Breakfast style={{ height: 220, width: 320, alignSelf: 'center' }} />
      <ScrollView>
        <TouchableOpacity
          onPress={() => navigation.navigate('Receipts')}
          style={dashBoardStyles.nav_button}>
          <Text style={dashBoardStyles.buttonText}>Receipts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Health')}
          style={dashBoardStyles.nav_button}>
          <Text style={dashBoardStyles.buttonText}>Health</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={dashBoardStyles.nav_button}>
          <Text style={dashBoardStyles.buttonText}>Placeholder 1</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={dashBoardStyles.nav_button}>
          <Text style={dashBoardStyles.buttonText}>Authorized Users</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          style={dashBoardStyles.nav_button}>
          <Text style={dashBoardStyles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Dashboard;
