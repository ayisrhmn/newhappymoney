import React from 'react';
import {StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {Button} from 'react-native-paper';

import {Colors, Mixins, Typography} from '@utils/index';

interface Props {
  children: any;
  mode?: 'text' | 'outlined' | 'contained';
  dark?: boolean;
  disabled?: boolean;
  uppercase?: boolean;
  color?: string;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onPress?: (() => void) | undefined;
}

const PaperButton = (props: Props) => {
  return (
    <Button
      {...props}
      dark
      style={props?.style}
      contentStyle={[styles.btnContent, props?.contentStyle]}
      labelStyle={[styles.labelBtn, props?.labelStyle]}
    >
      {props?.children}
    </Button>
  );
};

const styles = StyleSheet.create({
  labelBtn: {
    fontSize: Mixins.scaleFont(14),
    fontFamily: Typography.FONT_FAMILY_BOLD,
  },
  btnContent: {
    paddingVertical: Mixins.scaleSize(4),
  },
});

export default PaperButton;
