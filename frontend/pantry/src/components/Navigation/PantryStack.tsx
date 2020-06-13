import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
// import { FoodItem, Pantry, PantryView, FoodDetailed } from '../Pantry/index.ts';
import { useSelector } from 'react-redux';
import { PantryView, FoodDetailed } from '../Pantry/index.ts';
import { screenOptions } from './style.ts';

const Stack = createStackNavigator();

const PantryStack = ({ navigation }) => {
  const [loggedUser, selectedFood] = useSelector((state: any) => [
    state.user.userInfo.email.split('@')[0],
    state.pantry.selectedFood,
  ]);
  return (
    <Stack.Navigator
      screenOptions={{
        ...screenOptions,
      }}>
      {/* <Stack.Screen name="Pantry" component={Pantry} />
      <Stack.Screen name="Food" component={FoodItem} /> */}
      <Stack.Screen
        name="Pantry"
        component={PantryView}
        options={{ title: `${loggedUser}'s Pantry` }}
        // listeners={({ navigation, route }) => ({
        //   focus: (e) => {
        //     console.log(`Pantry View focused`);
        //     console.log(navigation);
        //     navigation.navigate('Pantry');
        //   },
        // })}
      />
      <Stack.Screen
        name="FoodDetailed"
        component={FoodDetailed}
        options={{
          title: `Detailed View`,
          headerBackTitle: 'Pantry',
        }}
      />
    </Stack.Navigator>
  );
};

export default PantryStack;
