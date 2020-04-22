import React from 'react';
import { View, Text } from 'react-native';
import UserProfile from './Profile.tsx';

const Dashboard = ({ navigation }) => {
  return (
    <View>
      <UserProfile />
    </View>
  );
};

export default Dashboard;
