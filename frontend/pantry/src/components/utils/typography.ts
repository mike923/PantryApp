import React from 'react';
import { Text, Platform, StyleSheet, View } from 'react-native';

export const typography = () => {
  const oldTextRender = Text.render;
  const oldViewRender = View.render;

  Text.render = function (...args) {
    const origin = oldTextRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [styles.defaultText, origin.props.style],
    });
  };
  View.render = function (...args) {
    const origin = oldViewRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [styles.defaultView, origin.props.style],
    });
  };
};

const styles = StyleSheet.create({
  defaultText: {
    color: 'red',
    fontFamily: 'DINPro-Medium',
  },
  defaultView: {
    backgroundColor: 'black',
  },
});
