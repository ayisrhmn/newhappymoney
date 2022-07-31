import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

import container from '@components/container';
import {Mixins} from 'utils';

interface Props {
  navigation: any;
}

const Layout = (props: Props) => {
  const {navigation} = props;

  return (
    <View style={{padding: Mixins.scaleSize(10)}}>
      <Icon name="home" size={Mixins.scaleSize(30)} color="#414141" />
      <Text>This is Splash screen!</Text>
    </View>
  );
};

export default container(Layout, false);
