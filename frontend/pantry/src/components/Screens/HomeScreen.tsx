import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Home/Home.tsx';
import User from '../User/User.tsx';
import Test from '../testComp/TestComp.tsx';

const Stack = createStackNavigator();

const HomeScreen = (props?: any) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="User" component={User} />
            <Stack.Screen name="Test" component={Test} />
        </Stack.Navigator>
    );
};

export default HomeScreen;
