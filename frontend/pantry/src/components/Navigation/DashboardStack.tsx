import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Reciepts from '../Reciepts/Reciepts.tsx';
import Dashboard from '../Dashboard/Dashboard.tsx';
import PantryView from '../Pantry/PantryView.tsx';

const Stack = createStackNavigator();

const DashboardStack = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Reciepts" component={Reciepts} />
      <Stack.Screen name="Pantry" component={PantryView} />
    </Stack.Navigator>
  );
};

export default DashboardStack;
