import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import User from '../User/User.tsx';

const Stack = createStackNavigator();

const UserScreen = (props?: any) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="User" component={User} />
            {/* <Stack.Screen name="Home" component={Home} /> */}
        </Stack.Navigator>
    );
};

export default UserScreen;
