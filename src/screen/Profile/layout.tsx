import React from 'react';
import {TouchableOpacity, View, Linking} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import {showMessage} from 'react-native-flash-message';

import container from '@components/container';
import Avatar from '@components/avatar';
import Button from '@components/button';
import {useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useActions} from '@overmind/index';
import {Colors, Mixins} from '@utils/index';

import {screenStyles} from './styles';

interface Props {
  navigation: any;
}

const Layout = (props: Props) => {
  const {navigation} = props;

  const {getMyProfile} = useActions();

  const isFocused = useIsFocused();

  const [data, setData] = React.useState({}) as any;
  const [waiting, setWaiting] = React.useState(false);

  const initData = () => {
    getMyProfile()
      .then(res => {
        setData(res);
      })
      .catch(() =>
        showMessage({
          type: 'danger',
          message: 'Failed load data profile',
        }),
      );
  };

  React.useEffect(() => {
    if (isFocused) {
      initData();
    }

    return () => {};
  }, [isFocused]);

  const doLogout = async () => {
    setWaiting(true);
    await AsyncStorage.removeItem('@user_token').then(() => {
      setWaiting(false);
      navigation.replace('Splash');
    });
    return;
  };

  const indexDomainEmail = data.Email?.indexOf('@');

  return (
    <View style={screenStyles.container}>
      <View style={screenStyles.header}>
        {data.Email && <Avatar initialName={data.Email} />}
        <Text style={screenStyles.username}>
          {data.Email?.substring(0, indexDomainEmail)}
        </Text>
        <Text style={screenStyles.email}>{data.Email}</Text>
      </View>

      <View style={screenStyles.actions}>
        <Button
          mode="contained"
          color={Colors.DANGER}
          loading={waiting}
          onPress={doLogout}
        >
          Logout
        </Button>
      </View>

      <View style={screenStyles.versionContent}>
        <Text style={screenStyles.versionText}>
          Version 1.0.0 | by Ayisrhmn
        </Text>

        <View style={screenStyles.followUs}>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://instagram.com/ayisrhmn/')}
          >
            <Icon
              name={'instagram'}
              size={Mixins.scaleFont(18)}
              color={Colors.GREY}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://linkedin.com/in/ayisrhmn/')}
          >
            <Icon
              name={'linkedin-square'}
              size={Mixins.scaleFont(18)}
              color={Colors.GREY}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://github.com/ayisrhmn/')}
          >
            <Icon
              name={'github'}
              size={Mixins.scaleFont(18)}
              color={Colors.GREY}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default container(Layout, false);
