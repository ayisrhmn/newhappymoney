import React from 'react';
import {View} from 'react-native';
import {Checkbox, Text} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';

import {useIsFocused} from '@react-navigation/native';
import {ContainerContext} from '@components/container';
import {useActions, useState} from '@overmind/index';
import {Colors, Helper} from '@utils/index';

import moment from 'moment';

import {screenStyles} from './styles';

interface Props {
  navigation: any;
}

const Layout = (props: Props) => {
  const ctx = React.useContext(ContainerContext);

  const {getMyBalance, setShowNextMonth, getSpendingToday} = useActions();
  const {showNextMonth} = useState();

  const isFocused = useIsFocused();

  const [loading, setLoading] = React.useState(false);
  const [balance, setBalance] = React.useState(0);
  const [spentToday, setSpentToday] = React.useState(0);

  const initData = () => {
    setLoading(true);
    setBalance(0);
    setSpentToday(0);

    let payload = {
      TrDateMonth: showNextMonth
        ? Helper.currentWithLastdateCondition('payload')
        : moment().format('YYYY-MM'),
    };
    let payloadTdy = {
      TrDate: moment().format('YYYY-MM-DD'),
    };

    Promise.all([getMyBalance(payload), getSpendingToday(payloadTdy)])
      .then(res => {
        let [my_balance, spent_today] = res;

        if (my_balance) {
          setBalance(my_balance);
        }

        if (spent_today) {
          setSpentToday(spent_today);
        }
      })
      .catch(() =>
        showMessage({
          type: 'danger',
          message: 'Failed load data balance & spent today',
        }),
      )
      .finally(() => setLoading(false));
  };

  React.useEffect(() => {
    if (isFocused || (isFocused && ctx.isRefreshing)) {
      initData();
    }

    return () => {};
  }, [isFocused, ctx.isRefreshing, showNextMonth]);

  return (
    <View style={screenStyles.balanceContainer}>
      <View style={[screenStyles.row, {justifyContent: 'space-between'}]}>
        <View>
          <Text style={screenStyles.balanceValue}>
            Rp {!loading && isFocused ? Helper.numberWithSeparator(balance) : 0}
          </Text>
          <Text style={screenStyles.balanceLabel}>Total balance</Text>
          {Helper.getLastDate() && (
            <View style={[screenStyles.row, screenStyles.rowCheckNextMonth]}>
              <View style={screenStyles.sizeCheckbox}>
                <Checkbox
                  status={showNextMonth ? 'checked' : 'unchecked'}
                  color={Colors.PRIMARY}
                  onPress={() => {
                    setShowNextMonth(!showNextMonth);
                  }}
                />
              </View>
              <Text style={screenStyles.checkboxText}>Show next month</Text>
            </View>
          )}
        </View>
        {spentToday !== 0 && (
          <View>
            <Text
              style={{
                ...screenStyles.balanceValue,
                color: Colors.DANGER,
                textAlign: 'right',
              }}
            >
              Rp{' '}
              {!loading && isFocused
                ? Helper.numberWithSeparator(spentToday)
                : 0}
            </Text>
            <Text style={{...screenStyles.balanceLabel, textAlign: 'right'}}>
              Total spent today
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Layout;
