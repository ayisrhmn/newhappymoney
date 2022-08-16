import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import {useForm} from 'react-hook-form';

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

  const {doSignUp} = useActions();

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
    register('ConfirmPswd', {required: 'This field is required'});

    return () => {};
  }, [register]);

  const funcDoSignUp = (val: any) => {
    setLoading(true);

    let payload = {
      Email: val.Email,
      Password: val.Password,
    };
    if (val.Password === val.ConfirmPswd) {
      doSignUp(payload)
        .then(async res => {
          try {
            let {Success} = res?.data;
            if (Success) {
              showMessage({
                type: 'success',
                message: 'Success | Sign in first to your account',
              });
              navigation.navigate('SignIn');
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
    } else {
      setLoading(false);
      showMessage({
        message: 'Your confirm password is wrong',
        type: 'danger',
      });
    }
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
      <Input
        mode="flat"
        type="password"
        label="Confirm Password"
        secureTextEntry={secure}
        onSecure={() => setSecure(!secure)}
        onChangeText={val =>
          setValue('ConfirmPswd', val, {shouldValidate: true})
        }
        error={errors.ConfirmPswd}
      />
      <View style={screenStyles.actions}>
        <Button
          mode="contained"
          loading={loading}
          onPress={() => handleSubmit(funcDoSignUp)()}
        >
          Sign Up
        </Button>

        <View style={screenStyles.linkWrapper}>
          <Text style={screenStyles.text}>Already have account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={screenStyles.textLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default container(Layout, false);
