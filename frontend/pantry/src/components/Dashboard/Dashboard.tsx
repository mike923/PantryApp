import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import UserProfile from './Profile.tsx';
import { dashBoardStyles } from './dashBoardStyles.ts';

const Dashboard = ({ navigation }) => {
  const navigateToImg = () => navigation.navigate('Pantry');
  const navigateToReceipts = () => navigation.navigate('Reciepts');
  return (
    <View>
      <UserProfile />
      {/* <DashboardNav/> */}
      <View style={dashBoardStyles.navContainer}>
        <TouchableOpacity
          onPress={() => navigateToImg()}
          style={dashBoardStyles.nav_button}>
          <Text>Pantry View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToReceipts()}
          style={dashBoardStyles.nav_button}>
          <Text>Receipts List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;
