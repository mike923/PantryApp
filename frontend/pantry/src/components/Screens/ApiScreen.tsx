import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ApiTester from '../testComp/ApiTester.tsx';
import ImageUpload from '../testComp/ImageUpload/ImageUpload.tsx';

const Stack = createStackNavigator();

const ApiScreen = (props?: any) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Api" component={ApiTester} />
            <Stack.Screen name="ImageUpload" component={ImageUpload} />
        </Stack.Navigator>
    );
};

export default ApiScreen;
