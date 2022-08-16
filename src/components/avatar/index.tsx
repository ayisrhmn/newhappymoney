import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

import {Colors, Mixins} from '@utils/index';

interface Props {
  initialName: any;
  backgroundColor?: string;
  textColor?: string;
}

const Avatar = ({
  initialName,
  backgroundColor = Colors.PRIMARY,
  textColor = Colors.WHITE,
}: Props) => {
  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <Text style={{...styles.text, color: textColor}}>
        {initialName?.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Mixins.scaleSize(12),
    paddingHorizontal: Mixins.scaleSize(17),
    borderRadius: Mixins.scaleSize(100),
  },
  text: {
    fontSize: Mixins.scaleFont(20),
    fontWeight: 'bold',
  },
});

export default Avatar;
