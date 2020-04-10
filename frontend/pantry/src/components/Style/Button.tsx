import React, { useState } from 'react'
import { View, Text, Button, TouchableOpacity, Image, Alert } from "react-native"
import { NeuButton } from "neumorphism-ui"
import styled from "styled-components"

export default () => {
  const [counter, setCounter] = useState(0)
  return (<View>
    <Title>
      This is test
    </Title>
    <Boton
      onPress={() => setCounter(counter + 1)}
      title={counter.toString()}
      >
      <Title>
        The icon goes to the right
      </Title>
      <Text> 
      </Text>
      <Text>  
      </Text>
      <Text> 
      </Text>
      <Text>
        X
      </Text>
    </Boton>
    <Button
      onPress={() => setCounter(counter + 1)}
      title={counter.toString()}
      color="#ff0000"
    />
    <NeuButton style={{ height: 150, width: 150, borderRadius: 75 }}
        onPress={() => {
          Alert.alert("I was pressed")
        }}
        onUnpress={() => {
          Alert.alert("I was unpressed")
        }}
      >
        <Text style={{ opacity: 0.4, textAlign: 'center' }}>NeuButton with listeners</Text>
    </NeuButton>
  </View>)
}

const Title = styled.Text`
  color: cyan;
`

const Boton = styled.TouchableOpacity`
  background-color: green;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 400px;
  padding: 15px 5px;
  border: transparent;
`