import React from 'react';
import {View} from 'react-native';

import container from '@components/container';

import TotalBalance from './total-balance';
import ReachedLimit from './reached-limit';
import SpendingReport from './spending-report';
import RecentTransaction from './recent-transactions';
import {screenStyles} from './styles';

interface Props {
  navigation: any;
}

const Layout = (props: Props) => {
  return (
    <View style={screenStyles.container}>
      <TotalBalance {...props} />
      <ReachedLimit {...props} />
      <SpendingReport {...props} />
      <RecentTransaction {...props} />
    </View>
  );
};

export default container(Layout);
