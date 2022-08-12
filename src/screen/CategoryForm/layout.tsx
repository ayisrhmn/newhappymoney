import React from 'react';
import {View} from 'react-native';

import container from '@components/container';

import {screenStyles} from './styles';
import CreateForm from './create';
import EditForm from './edit';

interface Props {
  navigation: any;
  route: any;
}

const Layout = (props: Props) => {
  const params = props?.route?.params;

  return (
    <View style={screenStyles.container}>
      {!params?.isEdit ? <CreateForm {...props} /> : <EditForm {...props} />}
    </View>
  );
};

export default container(Layout, false);
