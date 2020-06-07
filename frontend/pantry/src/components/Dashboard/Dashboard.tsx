import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import UserProfile from './Profile.tsx';
import { dashBoardStyles, profileStyles } from './dashBoardStyles.ts';

const Dashboard = ({ navigation }) => {
  const navigateToImg = () => navigation.navigate('Pantry');
  const navigateToReceipts = () => navigation.navigate('Receipts');
  return (
    <View>
      <UserProfile />
      <View style={profileStyles.navContainer}>
        <TouchableOpacity
          onPress={() => navigateToImg()}
          style={dashBoardStyles.nav_button}>
          <Text style={dashBoardStyles.buttonText}>Pantry View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToReceipts()}
          style={dashBoardStyles.nav_button}>
          <Text style={dashBoardStyles.buttonText}>Receipts List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;
