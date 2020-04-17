import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
} from 'react-navigation';
import Button from '../Style/Button.tsx';

import styles from './styles.ts';

export interface Props {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const Home = ({ navigation }: Props) => {
    const navigateToUsers = () => navigation.navigate('User');
    const navigateToTestComp = () => navigation.navigate('Test');
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <TouchableOpacity onPress={navigateToUsers} style={styles.button}>
                <Text style={styles.buttonText}>Go to Users</Text>
            </TouchableOpacity>
            <Button />
            <TouchableOpacity
                onPress={navigateToTestComp}
                style={styles.button}>
                <Text style={styles.buttonText}>Go to Test Comp</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Home;
