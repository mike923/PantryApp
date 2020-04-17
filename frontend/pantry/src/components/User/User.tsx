import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles.ts';

const User = ({ navigation }) => {
    const testUser = useSelector((state) => state.testUser);
    const navigateToHome = () => navigation.navigate('Home');

    useEffect(() => {
        console.log(testUser);
    }, [testUser]);

    const displayLoading = () => <Text style={styles.p}>Loading...</Text>;

    const displayUser = () => {
        const { title, first, last } = testUser.apiResults.name;
        const { city, state } = testUser.apiResults.location;
        return (
            <>
                <Text style={styles.p}>{`${title} ${first} ${last}`}</Text>
                <Text style={styles.p}>{`${city}, ${state}`}</Text>
            </>
        );
    };

    return (
        <View style={styles.container}>
            {testUser.apiResults ? displayUser() : displayLoading()}
            <TouchableOpacity onPress={navigateToHome} style={styles.button}>
                <Text style={styles.buttonText}>Go Home</Text>
            </TouchableOpacity>
        </View>
    );
};

export default User;
