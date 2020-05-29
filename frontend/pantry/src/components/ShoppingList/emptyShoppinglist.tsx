import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { emptyShoppingList } from './shoppingListStyles.ts';
import List from '../../../assets/images/support-notes-colour.svg';

const EmptyShoppingList = ({ navigation }: any) => {
  //   const navigateToCamera = () => {
  //     console.log('eagrhaetr');

  //     navigation.navigate('Camera');
  //   };
  return (
    <View style={emptyShoppingList.emptyListContainer}>
      <Text style={emptyShoppingList.primaryText}>Shopping list is empty</Text>
      <List style={emptyShoppingList.listSvg} />
      <Text style={emptyShoppingList.secondaryText}>Start Planning</Text>
    </View>
  );
};

export default EmptyShoppingList;
