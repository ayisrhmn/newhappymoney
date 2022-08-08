import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';

import {useIsFocused} from '@react-navigation/native';
import {ContainerContext} from '@components/container';
import {useActions} from '@overmind/index';
import {Helper} from '@utils/index';

import moment from 'moment';

import {screenStyles} from './styles';

interface Props {
  navigation: any;
}

const Layout = (props: Props) => {
  const ctx = React.useContext(ContainerContext);

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
    if (isFocused || (isFocused && ctx.isRefreshing)) {
      initData();
    }

    return () => {};
  }, [isFocused, ctx.isRefreshing]);

  return (
    <View style={screenStyles.balanceContainer}>
      <Text style={screenStyles.balanceValue}>
        Rp {!loading && isFocused ? Helper.numberWithSeparator(balance) : 0}
      </Text>
      <Text style={screenStyles.balanceLabel}>Total balance</Text>
    </View>
  );
};

export default Layout;
