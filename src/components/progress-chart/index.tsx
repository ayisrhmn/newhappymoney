import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Colors, Mixins} from '@utils/index';

interface Props {
  percentIn: number;
  percentEx: number;
  fixedNum?: boolean;
}

const ProgressChart = (props: Props) => {
  return (
    <View style={styles.chartContainer}>
      <View style={styles.inChart}>
        <Text style={styles.chartLabel}>
          {props?.fixedNum ? props?.percentIn?.toFixed(0) : props?.percentIn}%
        </Text>
        <Text style={styles.chartLabel}>
          {props?.fixedNum ? props?.percentEx?.toFixed(0) : props?.percentEx}%
        </Text>
        <View
          style={{
            ...styles.exChart,
            width: `${props?.percentEx}%`,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inChart: {
    flex: 1,
    height: Mixins.scaleSize(30),
    paddingHorizontal: Mixins.scaleSize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.SUCCESS,
    borderRadius: Mixins.scaleSize(4),
  },
  exChart: {
    backgroundColor: Colors.DANGER,
    height: Mixins.scaleSize(30),
    position: 'absolute',
    right: 0,
  },
  chartLabel: {
    fontSize: Mixins.scaleFont(14),
    fontWeight: 'bold',
    color: Colors.WHITE,
    zIndex: 3,
  },
});

export default ProgressChart;
