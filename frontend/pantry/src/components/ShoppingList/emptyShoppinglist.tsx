import React from 'react';
import { View, Text } from 'react-native';
import { emptyShoppingList } from './shoppingListStyles.ts';
import Planning from '../../../assets/images/support-notes-colour.svg';

const EmptyShoppingList = ({ navigation }: any) => {
  return (
    <View style={emptyShoppingList.emptyListContainer}>
      <Text style={emptyShoppingList.headerText}>
        Your Shopping list is empty
      </Text>
      <Planning style={emptyShoppingList.listSvg} />
      <Text style={emptyShoppingList.secondaryText}>Start Planning</Text>
    </View>
  );
};

export default EmptyShoppingList;
