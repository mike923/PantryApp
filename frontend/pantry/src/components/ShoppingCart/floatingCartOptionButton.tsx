import React from 'react';
import { View, Animated, TouchableNativeFeedback } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { actionButtonStyles } from './cartStyles.ts';

const FloatingActionButton = (props: any) => {
  let animation = new Animated.Value(0);

  let open = true;
  const toggleMenu = () => {
    let toValue = open ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    open = !open;
  };

  const plusStyle = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -80],
        }),
      },
    ],
  };

  const trashStyle = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140],
        }),
      },
    ],
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };

  // const opacity = animation.interpolate({
  //   inputRange: [0, 0.5, 1],
  //   outputRange: [0, 0, 1],
  // });

  return (
    <View style={[actionButtonStyles.floatingButtonContainer, props.style]}>
      <TouchableNativeFeedback>
        <Animated.View
          style={[
            actionButtonStyles.button,
            actionButtonStyles.secondary,
            actionButtonStyles.deleteButton,
            trashStyle,
          ]}>
          <FeatherIcon name="trash-2" style={actionButtonStyles.deleteIcon} />
        </Animated.View>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback>
        <Animated.View
          style={[
            actionButtonStyles.button,
            actionButtonStyles.secondary,
            actionButtonStyles.addButton,
            plusStyle,
          ]}>
          <FeatherIcon
            name="plus-circle"
            style={actionButtonStyles.deleteIcon}
          />
        </Animated.View>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback onPress={toggleMenu}>
        <Animated.View
          style={[
            actionButtonStyles.button,
            actionButtonStyles.menu,
            rotation,
          ]}>
          <FeatherIcon name="plus" style={actionButtonStyles.deleteIcon} />
        </Animated.View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default FloatingActionButton;
