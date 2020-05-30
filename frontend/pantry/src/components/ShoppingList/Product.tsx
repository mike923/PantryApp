import React, { useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { productStyles } from './shoppingListStyles.ts';
import RenderText from './renderText.tsx';

const Product = ({
  item,
  quant,
  keyVal,
  updateItem,
  setItemToComplete,
}: any) => {
  const [editableName, setEditableName] = useState(false);
  const [editableQuant, setEditableQuant] = useState(false);
  const [name, setName] = useState(item);
  const [quantity, setQuantity] = useState(quant);

  return (
    <View key={keyVal} style={productStyles.product}>
      <RenderText
        name={name}
        quant={quantity}
        setName={setName}
        updateItem={updateItem}
        setQuantity={setQuantity}
        editableName={editableName}
        editableQuant={editableQuant}
        setEditableName={setEditableName}
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
            if (name.length || quantity.length) {
              updateItem(keyVal, name, quantity);
            }
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
