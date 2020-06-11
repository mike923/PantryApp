import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { emptyShoppingList } from './shoppingListStyles.ts';
import Planning from '../../../assets/images/support-notes-colour.svg';

const EmptyShoppingList = ({ navigation }: any) => {
  return (
    <View style={style.container}>
      <Planning style={style.svgImg} />
      <View style={[style.divider, { backgroundColor: '#ffffff90' }]}>
        <Text style={style.primaryText}>
          Your Shopping List is empty{'\n'}Start planning
        </Text>
      </View>
      <View style={style.divider} />
      <View style={style.divider} />
      <View style={style.divider} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  divider: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  primaryText: {
    color: 'black',
    fontSize: 35,
    textAlign: 'center',
  },
  svgImg: {
    flex: 0,
    height: '90%',
    position: 'absolute',
    top: '15%',
    width: '90%',
  },
});

export default EmptyShoppingList;
