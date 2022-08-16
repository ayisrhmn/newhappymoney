import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Colors, Mixins} from '@utils/index';

interface Props {
  backgroundColor?: string;
  iconColor?: string;
}

const IconCategory = ({
  backgroundColor = Colors.SUCCESS,
  iconColor = Colors.WHITE,
}: Props) => {
  return (
    <View
      style={[
        styles.iconCategory,
        {
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <Icon
        name="briefcase-outline"
        color={iconColor}
        size={Mixins.scaleFont(17)}
      />
    </View>
  );
};

export default IconCategory;

const styles = StyleSheet.create({
  iconCategory: {
    paddingVertical: Mixins.scaleSize(9),
    paddingHorizontal: Mixins.scaleSize(11),
    borderRadius: Mixins.scaleSize(100),
  },
});
