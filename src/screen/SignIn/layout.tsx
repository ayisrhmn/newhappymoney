import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import {useForm} from 'react-hook-form';

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

  const {doSignIn, setToken, setCloseReachedLimit} = useActions();

  const [secure, setSecure] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();

  React.useEffect(() => {
    register('Email', {required: 'This field is required'});
    register('Password', {required: 'This field is required'});

    return () => {};
  }, [register]);

  const funcDoSignIn = (val: any) => {
    setLoading(true);

    let payload = {
      Email: val.Email,
      Password: val.Password,
    };
    doSignIn(payload)
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
            setCloseReachedLimit(false);
            navigation.replace('MainNav');
            return;
          }
        } catch (error) {
          console.log(res);
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        showMessage({
          message: err.response.data.Message,
          type: 'danger',
        });
      });
  };

  return (
    <View style={screenStyles.container}>
      <Input
        mode="flat"
        type="text"
        label="Email"
        onChangeText={val => setValue('Email', val, {shouldValidate: true})}
        error={errors.Email}
      />
      <Input
        mode="flat"
        type="password"
        label="Password"
        secureTextEntry={secure}
        onSecure={() => setSecure(!secure)}
        onChangeText={val => setValue('Password', val, {shouldValidate: true})}
        error={errors.Password}
      />
      <View style={screenStyles.actions}>
        <Button
          mode="contained"
          loading={loading}
          onPress={() => handleSubmit(funcDoSignIn)()}
        >
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
