import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import UserProfile from './Profile.tsx';
import { dashBoardStyles } from './dashBoardStyles.ts';

const Dashboard = ({ navigation }) => {
  const navigateToImg = () => navigation.navigate('Pantry');
  const navigateToReceipts = () => navigation.navigate('Reciepts');
  return (
    <View style={{ backgroundColor: '#fff' }}>
      <UserProfile />
      {/* <DashboardNav/> */}
      <View style={dashBoardStyles.navContainer}>
        <TouchableOpacity
          onPress={() => navigateToImg()}
          style={dashBoardStyles.nav_button}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
            Pantry View
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToReceipts()}
          style={dashBoardStyles.nav_button}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>
            Receipts List
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Dashboard;
