import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useActions} from '@overmind/index';
import {Colors, Mixins} from '@utils/index';

interface Props {
  navigation: any;
}

const Layout = (props: Props) => {
  const {navigation} = props;

  const {getMyProfile} = useActions();

  const [data, setData] = React.useState({}) as any;

  const initData = () => {
    getMyProfile()
      .then(res => setData(res))
      .catch(err =>
        showMessage({
          type: 'danger',
          message: err.response.data.Message,
        }),
      );
  };

  React.useEffect(() => {
    initData();

    return () => {};
  }, []);

  const doLogout = async () => {
    await AsyncStorage.removeItem('@user_token');
    navigation.replace('Splash');
    return;
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Hello, {data.Email}</Text>
      <TouchableOpacity onPress={doLogout}>
        <Text
          style={{
            fontWeight: 'bold',
            color: Colors.DANGER,
            marginTop: Mixins.scaleSize(10),
          }}
        >
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Layout;
