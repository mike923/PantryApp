import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Text,
    TouchableOpacity,
    View,
    SectionList,
    TextInput,
} from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
import styles from './styles.ts';
import { getRandomUser } from '../../redux/actions/testActions.ts';

const ApiTester = ({ navigation }) => {
    const [api, setApi] = useState('https://randomuser.me/api/');
    const [res, setRes] = useState([]);

    const navigateToImg = () => navigation.navigate('ImageUpload');
    const displayLoading = () => <Text style={styles.p}>Loading...</Text>;

    const loadApi = async () => {
        console.log(api);
        try {
            const { data } = await axios.get(api);
            console.log(data);
            setRes(displayResults(data.results));
        } catch (err) {
            console.log('error: ', err);
        }
    };

    const displayResults = (data) => {
        let arr = Object.keys(data);
        return arr.map((key) => (
            <>
                <Text>-</Text>
                <Text style={styles.p}> key: {key} </Text>
                <Text style={styles.p}>
                    {' '}
                    value:{' '}
                    {typeof data[key] === 'object'
                        ? displayResults(data[key])
                        : data[key]}{' '}
                </Text>
                <Text>-</Text>
            </>
        ));
    };

    return (
        <View style={styles.container}>
            <View style={styles.h1View}>
                <TextInput
                    style={styles.h1}
                    onChangeText={(text) => setApi(text)}
                    value={api}
                />
            </View>
            <TouchableOpacity onPress={() => loadApi()} style={styles.button}>
                <Text style={styles.buttonText}>Get Results</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigateToImg()}
                style={styles.button}>
                <Text style={styles.buttonText}>Image Upload</Text>
            </TouchableOpacity>
            <ScrollView>{res}</ScrollView>
        </View>
    );
};

export default ApiTester;
