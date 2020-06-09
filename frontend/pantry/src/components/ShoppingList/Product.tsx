import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
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
  const [editable, setEditable] = useState(false);
  const [name, setName] = useState(item);
  const [quantity, setQuantity] = useState(quant);
  const [userActionsVisible, setUserActionsVisible] = useState(false);

  return (
    <View>
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
        <Icon
          name="chevron-down"
          style={{ bottom: 15, position: 'absolute', right: 20, fontSize: 18 }}
        />
      </TouchableOpacity>
      {userActionsVisible ? (
        // the view only shows up if the user clicks on the item
        // preventing overlap with item
        <View key={keyVal + 1} style={productStyles.itemActionsVisible}>
          {/* {editableQuant || editableName ? ( */}
          <Icon
            key={keyVal + 2}
            name="pencil"
            onPress={() => {
              setEditable(!editable);
            }}
            style={[productStyles.editBtn, productStyles.editIcons]}
          />
          {editable ? ( // checking if the use is editing the text
            <Icon
              key={keyVal + 3}
              name="check"
              style={[productStyles.editable, productStyles.editIcons]}
              onPress={() => {
                setEditable(false);
                setUserActionsVisible(!userActionsVisible);
                if (name.length || quantity.length) {
                  updateItem(keyVal, name, quantity);
                }
              }}
            />
          ) : null}
          <Icon
            key={keyVal + 4}
            name="trash"
            onPress={() => setItemToComplete(keyVal)}
            style={[productStyles.deleteBtn, productStyles.editIcons]}
          />
        </View>
      ) : null}
    </View>
  );
};

export default Product;
