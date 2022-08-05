import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

interface Props {
  navigation: any;
}

const Layout = (props: Props) => {
  const {navigation} = props;

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>This is Transactions screen!</Text>
    </View>
  );
};

export default Layout;
