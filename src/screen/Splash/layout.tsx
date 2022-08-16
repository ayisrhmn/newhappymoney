import React from 'react';
import {Image, View} from 'react-native';
import {Text} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';

import AsyncStorage from '@react-native-async-storage/async-storage';
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

  const redirect = async () => {
    getApiTest()
      .then(res => setStatus(res))
      .catch(() =>
        showMessage({
          type: 'danger',
          message: 'Please, check your connection!',
        }),
      );

    let userToken = await AsyncStorage.getItem('@user_token');
    let isUserToken: {
      isLogin: boolean;
      token: string;
    };

    if (userToken !== null) {
      isUserToken = JSON.parse(userToken);
      global.token = isUserToken.token;
    } else {
      global.token = '';
    }

    if (status.length > 0) {
      setTimeout(() => {
        if (userToken === null) {
          navigation.replace('SignIn');
        } else {
          navigation.replace('MainNav');
        }
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
