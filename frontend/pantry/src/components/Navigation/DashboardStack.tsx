import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createAppContainer } from 'react-navigation';
import Reciepts from '../Reciepts/Reciepts.tsx';
import Dashboard from '../Dashboard/Dashboard.tsx';
import PantryView from '../Pantry/PantryView.tsx';
import { screenOptions } from './style.ts';

// const Stack = createStackNavigator(
//   {
//     Dashboard: {
//       screen: Dashboard,
// navigationOptions: {
//   header: null,
// },
//     },
//     Reciepts,
//     Pantry: {
//       screen: PantryView,
//     },
//   },
//   {
//     initialRouteName: 'Dashboard',
//   },
// );

// const RootContainer = createAppContainer(Stack);
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
      <Stack.Screen name="Reciepts" component={Reciepts} />
      <Stack.Screen name="Pantry" component={PantryView} />
    </Stack.Navigator>
  );
};

// const DashboardStack = () => {
//   return <RootContainer />;
// };

export default DashboardStack;
