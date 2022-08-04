import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useActions} from '@overmind/index';
import container from '@components/container';
import Input from '@components/input';
import Button from '@components/button';

import {screenStyles} from './styles';

interface Props {
  navigation: any;
}

const Layout = (props: Props) => {
  const {navigation} = props;

  const {doSignIn, setToken} = useActions();

  const [Email, setEmail] = React.useState(
    __DEV__ ? 'testing@happymoney.com' : '',
  );
  const [Password, setPassword] = React.useState(__DEV__ ? 'testing123' : '');
  const [secure, setSecure] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const funcDoSignIn = () => {
    setLoading(true);

    doSignIn({
      Email,
      Password,
    })
      .then(async res => {
        try {
          let {Success, Data} = res?.data;
          if (Success) {
            global.token = Data;
            setToken(Data);
            await AsyncStorage.setItem(
              '@user_token',
              JSON.stringify({
                isLogin: true,
                token: Data,
              }),
            );
            navigation.replace('Home');
            return;
          }
        } catch (error) {
          console.log(res);
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);

        if (Email === '' && Password === '') {
          showMessage({
            message: 'Please, fill this form',
            type: 'danger',
          });
        } else if (Email === '') {
          showMessage({
            message: 'Please, fill your email',
            type: 'danger',
          });
        } else if (Password === '') {
          showMessage({
            message: 'Please, fill your password',
            type: 'danger',
          });
        } else {
          showMessage({
            message: err.response.data.Message,
            type: 'danger',
          });
        }
      });
  };

  return (
    <View style={screenStyles.container}>
      <Input
        mode="flat"
        type="text"
        label={'Email'}
        value={Email}
        onChangeText={val => setEmail(val)}
      />
      <Input
        mode="flat"
        type="password"
        label={'Password'}
        secureTextEntry={secure}
        onSecure={() => setSecure(!secure)}
        value={Password}
        onChangeText={val => setPassword(val)}
      />
      <View style={screenStyles.actions}>
        <Button mode="contained" loading={loading} onPress={funcDoSignIn}>
          Sign In
        </Button>

        <View style={screenStyles.linkWrapper}>
          <Text style={screenStyles.text}>Don't have account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={screenStyles.textLink}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default container(Layout, false);
