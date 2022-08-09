import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons';

import {useIsFocused} from '@react-navigation/native';
import {ContainerContext} from '@components/container';
import {useActions, useState} from '@overmind/index';
import {Colors, Helper, Mixins} from '@utils/index';

import moment from 'moment';

import {screenStyles} from './styles';

interface Props {
  navigation: any;
}

const Layout = (props: Props) => {
  const ctx = React.useContext(ContainerContext);

  const {getReachedLimit, setCloseReachedLimit} = useActions();
  const {closeReachedLimit} = useState();

  const isFocused = useIsFocused();

  const [data, setData] = React.useState([]) as any;

  const initData = () => {
    setData([]);

    let payload = {
      TrDateMonth: moment().format('YYYY-MM'),
    };
    getReachedLimit(payload)
      .then(res => {
        setData(res);
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
    <View
      style={[
        screenStyles.card,
        {
          marginBottom: Mixins.scaleSize(18),
          display: closeReachedLimit
            ? 'none'
            : data.length === 0
            ? 'none'
            : undefined,
        },
      ]}
    >
      <View style={screenStyles.titleReached}>
        <Text style={screenStyles.title}>Category reached limit</Text>
        <TouchableOpacity onPress={() => setCloseReachedLimit(true)}>
          <Icon name="close" color={Colors.GREY} size={Mixins.scaleFont(17)} />
        </TouchableOpacity>
      </View>
      <View style={{marginBottom: Mixins.scaleSize(6)}}>
        {data?.map((item: any, i: number) => (
          <View style={screenStyles.listReached} key={i}>
            <View style={{flexDirection: 'row'}}>
              <Text style={screenStyles.categoryLabel}>{i + 1}. </Text>
              <View>
                <Text style={screenStyles.categoryLabel}>{item.Category}</Text>
                <Text style={screenStyles.amountTopLabel}>
                  Limit: Rp {Helper.numberWithSeparator(item.Limit)}
                </Text>
              </View>
            </View>
            <Text style={screenStyles.amountReached}>
              Rp {Helper.numberWithSeparator(item.Total)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Layout;
