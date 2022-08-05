import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text, ActivityIndicator} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';

import {useIsFocused} from '@react-navigation/native';
import container from '@components/container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useActions} from '@overmind/index';
import {Colors, Helper, Mixins} from '@utils/index';
import {screenStyles} from './styles';
import moment from 'moment';

interface Props {
  navigation: any;
}

const Layout = (props: Props) => {
  const {navigation} = props;

  const {getMyBalance} = useActions();

  const isFocused = useIsFocused();

  const [loading, setLoading] = React.useState(false);
  const [balance, setBalance] = React.useState(0);

  const initData = () => {
    setLoading(true);

    let payload = {
      TrDateMonth: moment().format('YYYY-MM'),
    };
    getMyBalance(payload)
      .then(res => {
        setBalance(res);
        setLoading(false);
      })
      .catch(err =>
        showMessage({
          type: 'danger',
          message: err.response.data.Message,
        }),
      );
  };

  React.useEffect(() => {
    if (isFocused) {
      initData();
    }

    return () => {};
  }, [isFocused]);

  return (
    <View style={screenStyles.container}>
      {loading && (
        <ActivityIndicator
          color={Colors.PRIMARY}
          size="small"
          style={screenStyles.loadingWrapper}
        />
      )}

      {!loading && isFocused && (
        <View style={screenStyles.balanceWrapper}>
          <Text style={screenStyles.balanceValue}>
            Rp {Helper.numberWithSeparator(balance)}
          </Text>
          <Text style={screenStyles.balanceLabel}>Total balance</Text>
        </View>
      )}
    </View>
  );
};

export default container(Layout);
