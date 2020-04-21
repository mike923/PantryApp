import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  // headerTintColor: '#ff5c61',
});

const screenOptions = {
  headerStyle: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTintColor: '#ff5c61',
};

export { style, screenOptions };
