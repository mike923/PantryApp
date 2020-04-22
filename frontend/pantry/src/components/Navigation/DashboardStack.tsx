import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Reciepts from '../Reciepts/Reciepts.tsx';
import Dashboard from '../Dashboard/Dashboard.tsx';
import PantryView from '../Pantry/PantryView.tsx';

const Stack = createStackNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        header: null,
      },
    },
    Reciepts,
    Pantry: {
      screen: PantryView,
    },
  },
  {
    initialRouteName: 'Dashboard',
  },
);

const RootContainer = createAppContainer(Stack);

const DashboardStack = () => {
  return <RootContainer />;
};

export default DashboardStack;
