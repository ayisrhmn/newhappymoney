import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

import {useActions, useState} from '@overmind/index';
import container from '@components/container';
import {Mixins} from '@utils/index';

interface Props {
  navigation: any;
}

const Layout = (props: Props) => {
  const {navigation} = props;

  const {test} = useActions();
  const {valTest} = useState();

  React.useEffect(() => {
    test();

    return () => {};
  }, []);

  return (
    <View style={{padding: Mixins.scaleSize(10)}}>
      <Icon name="home" size={Mixins.scaleSize(30)} color="#414141" />
      <Text>This is Splash screen!</Text>
      <Text>Val Test: {valTest}</Text>
    </View>
  );
};

export default container(Layout, false);
