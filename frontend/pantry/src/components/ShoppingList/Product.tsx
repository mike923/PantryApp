import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { productStyles } from './shoppingListStyles.ts';
import RenderText from './renderText.tsx';

const Product = ({
  item,
  quant,
  keyVal,
  unique,
  updateItem,
  setItemToComplete,
}: any) => {
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(item);
  const [quantity, setQuantity] = useState(quant);
  const [identity, setIdentity] = useState();
  const [userActionsVisible, setUserActionsVisible] = useState(false);

  useEffect(() => {
    setIdentity(name);
  }, []);

  console.log('id', identity);

  return (
    <TouchableOpacity
      key={keyVal}
      style={productStyles.product}
      onPress={() => setUserActionsVisible(!userActionsVisible)}>
      <RenderText
        key={keyVal}
        name={name}
        quant={quantity}
        setName={setName}
        updateItem={updateItem}
        setQuantity={setQuantity}
        editable={editable}
      />

      <View
        key={keyVal}
        style={
          userActionsVisible
            ? productStyles.itemActionsVisible
            : productStyles.itemActionsInvisible
        }>
        {/* {editableQuant || editableName ? ( */}
        <Icon
          key={keyVal}
          name="pencil"
          onPress={() => {
            setEditable(!editable);
          }}
          style={productStyles.editBtn}
        />
        <Icon
          key={keyVal}
          name="check"
          size={25}
          style={productStyles.editable}
          onPress={() => {
            setEditable(false);
            if (name.length || quantity.length) {
              updateItem(keyVal, name, quantity);
            }
          }}
        />
        {/* ) : null} */}
        <Icon
          key={keyVal}
          name="trash"
          onPress={() => setItemToComplete(keyVal)}
          style={productStyles.deleteBtn}
        />
      </View>
      {/* <Icon
        name="trash"
        onPress={() => setItemToComplete(keyVal)}
        style={productStyles.deleteBtn}
      /> */}
    </TouchableOpacity>
  );
};

export default Product;
