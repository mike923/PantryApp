import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Receipts from '../Receipts/Receipts.tsx';
import Dashboard from '../Dashboard/Dashboard.tsx';
import { screenOptions } from './style.ts';
import SettingsStack from './SettingsStack.tsx';
import HealthFrom from '../Dashboard/Health/HealthForm.tsx';

const Stack = createStackNavigator();
const DashboardStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
      }}>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        headerMode="screen"
        headerShown="false"
        options={{
          headerMode: 'none',
          headerShown: false,
        }}
      />
      <Stack.Screen name="Receipts" component={Receipts} />
      <Stack.Screen name="Settings" component={SettingsStack} />
      <Stack.Screen name="Health" component={HealthFrom} />
    </Stack.Navigator>
  );
};

// const DashboardStack = () => {
//   return <RootContainer />;
// };

export default DashboardStack;
