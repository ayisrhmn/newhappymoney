import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';

import {useIsFocused} from '@react-navigation/native';
import {ContainerContext} from '@components/container';
import {useActions} from '@overmind/index';
import {Colors, Helper, Mixins} from '@utils/index';

import moment from 'moment';

import {screenStyles} from './styles';

interface Props {
  navigation: any;
}

const Layout = (props: Props) => {
  const {navigation} = props;
  const ctx = React.useContext(ContainerContext);

  const {getMyTransactions} = useActions();

  const isFocused = useIsFocused();

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]) as any;

  const initData = () => {
    setLoading(true);

    let payload = {
      TrDateMonth: moment().format('YYYY-MM'),
      Show: 'Recent',
      Sort: 'Newest',
    };
    getMyTransactions(payload)
      .then(res => {
        setData(res);
        setLoading(false);
      })
      .catch(() =>
        showMessage({
          type: 'danger',
          message: 'Failed load data transactions',
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
    <View style={screenStyles.sectionContainer}>
      <View style={screenStyles.rowTitle}>
        <Text style={screenStyles.title}>Recent transactions</Text>
        {data?.length > 0 && (
          <TouchableOpacity onPress={() => navigation.navigate('Transactions')}>
            <Text style={screenStyles.titleLink}>See all</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={screenStyles.card}>
        {data?.length === 0 && (
          <View style={screenStyles.noDataWrapper}>
            <Text style={screenStyles.noDataText}>No transaction data</Text>
          </View>
        )}
        {data?.length > 0 && (
          <RecentTransaction
            data={data}
            loading={loading}
            isFocused={isFocused}
          />
        )}
      </View>
    </View>
  );
};

const RecentTransaction = ({data, loading, isFocused}: any) => {
  return (
    <View style={screenStyles.recentTr}>
      {loading && (
        <ActivityIndicator
          size="small"
          color={Colors.PRIMARY}
          style={{
            marginTop: Mixins.scaleSize(8),
            marginBottom: Mixins.scaleSize(16),
          }}
        />
      )}
      {!loading && isFocused && (
        <>
          {data?.map((item: any, i: number) => {
            return (
              <View style={screenStyles.trList} key={i}>
                <View style={screenStyles.rowCategory}>
                  <View>
                    <Text style={screenStyles.categoryLabel}>{item.Title}</Text>
                    <Text style={screenStyles.categoryTrLabel}>
                      {item.Category?.Name}
                    </Text>
                    <Text style={screenStyles.trDateLabel}>
                      {moment(item.TrDate).format('DD MMMM YYYY')}
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    ...screenStyles.amountTr,
                    color:
                      item.Category?.Type === 'Income'
                        ? Colors.SUCCESS
                        : Colors.DANGER,
                  }}
                >
                  Rp {Helper.numberWithSeparator(item.Amount)}
                </Text>
              </View>
            );
          })}
        </>
      )}
    </View>
  );
};

export default Layout;
