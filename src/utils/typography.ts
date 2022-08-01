import React from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

// font family
export const FONT_FAMILY_REGULAR = 'Lato-Regular';
export const FONT_FAMILY_BOLD = 'Lato-Bold';

// set custom fonts globally
export const typography = () => {
  let text: any = Text;
  let oldRender = text.render;

  text.render = function (...args: any) {
    let origin: any = oldRender.call(this, ...args);

    return React.cloneElement(origin, {
      style:
        origin.props.style?.fontWeight === 'bold' ||
        origin.props.style?.fontWeight === '700'
          ? [styles.bold, origin.props.style, {fontWeight: 'normal'}]
          : [styles.default, origin.props.style, {fontWeight: 'normal'}],
    });
  };
};

const styles = StyleSheet.create({
  default: {
    fontFamily: FONT_FAMILY_REGULAR,
  },
  bold: {
    fontFamily: FONT_FAMILY_BOLD,
  },
});
