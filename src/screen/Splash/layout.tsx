import React from 'react';
import {Image, View} from 'react-native';
import {Text} from 'react-native-paper';

import container from '@components/container';
import images from '@assets/images';
import {Colors} from '@utils/index';
import {useActions} from '@overmind/index';

import {screenStyles} from './styles';

interface Props {
  navigation: any;
}

const Layout = (props: Props) => {
  const {navigation} = props;

  const {getApiTest} = useActions();

  const [status, setStatus] = React.useState('');

  const redirect = () => {
    getApiTest().then(res => setStatus(res));

    if (status.length > 0) {
      setTimeout(() => {
        navigation.replace('SignIn');
      }, 3000);
    }
  };

  React.useEffect(() => {
    redirect();

    return () => {};
  }, [status]);

  return (
    <View style={screenStyles.container}>
      <Image source={images.cost} style={screenStyles.image} />
      <Text style={screenStyles.maintitle}>HappyMoney</Text>
      <Text style={screenStyles.subtitle}>Income & Expense Tracker</Text>
    </View>
  );
};

export default container(Layout, false, Colors.WHITE);
