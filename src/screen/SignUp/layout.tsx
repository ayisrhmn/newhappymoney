import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';

import container from '@components/container';
import Input from '@components/input';
import Button from '@components/button';
import {Colors, Mixins} from '@utils/index';

import {screenStyles} from './styles';

interface Props {
  navigation?: any;
}

const Layout = (props: Props) => {
  const {navigation} = props;

  const [secure, setSecure] = React.useState(true);

  return (
    <View style={screenStyles.container}>
      <Input mode="flat" type="text" label={'Email'} />
      <Input
        mode="flat"
        type="password"
        label={'Password'}
        secureTextEntry={secure}
        onSecure={() => setSecure(!secure)}
      />
      <View style={screenStyles.actions}>
        <Button mode="contained" onPress={() => navigation.replace('SignIn')}>
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
