import React, { useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { productStyles } from './shoppingListStyles.ts';
import RenderText from './renderText.tsx';

const Product = ({
  keyVal,
  item,
  setItemToComplete,
  editable,
  quant,
  setEditable,
}: any) => {
  const [editableName, setEditableName] = useState(false);
  const [editableQuant, setEditableQuant] = useState(false);
  return (
    <View key={keyVal} style={productStyles.product}>
      <RenderText
        editable={editable}
        item={item}
        quant={quant}
        setEditable={setEditable}
        editableName={editableName}
        setEditableName={setEditableName}
        editableQuant={editableQuant}
        setEditableQuant={setEditableQuant}
      />

      {editableQuant || editableName ? (
        <Icon
          name="check"
          size={25}
          color="#900"
          style={productStyles.editable}
          onPress={() => {
            setEditableQuant(false);
            setEditableName(false);
          }}
        />
      ) : null}

      <Icon
        name="trash"
        onPress={() => setItemToComplete(keyVal)}
        style={productStyles.deleteBtn}
      />
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  deleteBtn: {
    alignItems: 'center',
    bottom: 10,
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 10,
    // padding: 10,
  },
  product: {
    borderBottomColor: '#ededed',
    borderBottomWidth: 2,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingRight: 100,
    position: 'relative',
  },
  productInfo: {
    borderLeftColor: 'black',
    borderLeftWidth: 10,
    paddingLeft: 20,
  },
});
