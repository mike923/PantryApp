import React, { useState } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import { NeuButton } from 'neumorphism-ui';
import styled from 'styled-components';

export default () => {
    const [counter, setCounter] = useState(0);
    return (
        <Boton
            onPress={() => setCounter(counter + 1)}
            title={counter.toString()}>
            <Title>The icon goes to the right</Title>
            <Text>X</Text>
        </Boton>
    );
};

const Title = styled.Text`
    color: cyan;
`;

const Boton = styled.TouchableOpacity`
    background-color: green;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 400px;
    padding: 15px 5px;
    border: transparent;
`;
