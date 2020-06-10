import React from 'react';
import { View } from 'react-native';
import UserProfile from './Profile.tsx';
import DashboardNav from './DashboardNav.tsx';
import { dashBoardStyles } from './dashBoardStyles.ts';

const Dashboard = ({ navigation }: any) => {
  return (
    <View style={dashBoardStyles.container}>
      <UserProfile />
      <DashboardNav navigation={navigation} />
    </View>
  );
};

export default Dashboard;
