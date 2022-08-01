import React from 'react';
import {Image, View} from 'react-native';
import {Text} from 'react-native-paper';

import container from '@components/container';
import images from '@assets/images';

import {screenStyles} from './styles';
import {Colors} from '@utils/index';

interface Props {
  navigation: any;
}

const Layout = (props: Props) => {
  const {navigation} = props;

  const redirect = () => {
    setTimeout(() => {
      navigation.replace('SignIn');
    }, 3000);
  };

  React.useEffect(() => {
    redirect();

    return () => {};
  }, [navigation]);

  return (
    <View style={screenStyles.container}>
      <Image source={images.cost} style={screenStyles.image} />
      <Text style={screenStyles.maintitle}>HappyMoney</Text>
      <Text style={screenStyles.subtitle}>Income & Expense Tracker</Text>
    </View>
  );
};

export default container(Layout, false, Colors.WHITE);
