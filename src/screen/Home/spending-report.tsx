import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';

import {useIsFocused} from '@react-navigation/native';
import {ContainerContext} from '@components/container';
import ProgressChart from '@components/progress-chart';
import IconCategory from '@components/icon-category';
import {useActions, useState} from '@overmind/index';
import {Colors, Helper, Mixins} from '@utils/index';

import moment from 'moment';

import {screenStyles} from './styles';

interface Props {
  navigation: any;
}

const Layout = (props: Props) => {
  const {navigation} = props;

  const ctx = React.useContext(ContainerContext);

  const {getMySpendingReport, getTopIncome, getTopExpense} = useActions();
  const {showNextMonth} = useState();

  const isFocused = useIsFocused();

  const [loading, setLoading] = React.useState(false);
  const [spending, setSpending] = React.useState({}) as any;
  const [topIncome, setTopIncome] = React.useState([]) as any;
  const [topExpense, setTopExpense] = React.useState([]) as any;

  const initData = () => {
    setLoading(true);

    let payload = {
      TrDateMonth: showNextMonth
        ? Helper.currentWithLastdateCondition('payload')
        : moment().format('YYYY-MM'),
      Show: 'Top3',
    };
    Promise.all([
      getMySpendingReport(payload),
      getTopIncome(payload),
      getTopExpense(payload),
    ])
      .then(res => {
        let [spending_report, top_income, top_expense] = res;

        if (spending_report) {
          let {
            data: {Success, Data},
          } = spending_report;
          if (Success) {
            setSpending(Data);
          }
        }

        if (top_income) {
          let {
            data: {Success, Data},
          } = top_income;
          if (Success) {
            setTopIncome(Data);
          }
        }

        if (top_expense) {
          let {
            data: {Success, Data},
          } = top_expense;
          if (Success) {
            setTopExpense(Data);
          }
        }
      })
      .finally(() => setLoading(false))
      .catch(() =>
        showMessage({
          type: 'danger',
          message: 'Error load data report',
        }),
      );
  };

  React.useEffect(() => {
    if (isFocused || (isFocused && ctx.isRefreshing)) {
      initData();
    }

    return () => {};
  }, [isFocused, ctx.isRefreshing, showNextMonth]);

  const percentIn = isNaN(spending.PercentageIn * 100)
    ? 0
    : spending.PercentageIn * 100;
  const percentEx = isNaN(spending.PercentageEx * 100)
    ? 0
    : spending.PercentageEx * 100;

  return (
    <View style={screenStyles.sectionContainer}>
      <View style={screenStyles.rowTitle}>
        <Text style={screenStyles.title}>Spending report</Text>
        {(topIncome?.length > 0 || topExpense?.length > 0) && (
          <TouchableOpacity onPress={() => navigation.navigate('Report')}>
            <Text style={screenStyles.titleLink}>See reports</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={screenStyles.card}>
        <View style={screenStyles.amountWrapper}>
          <TotalAmountReport
            income={spending?.Income}
            expense={spending?.Expense}
            loading={loading}
            isFocused={isFocused}
          />
        </View>

        <View style={screenStyles.progressWrapper}>
          <ProgressChart
            percentIn={!loading && isFocused ? percentIn : 0}
            percentEx={!loading && isFocused ? percentEx : 0}
            fixedNum={true}
          />
        </View>

        {topIncome?.length !== 0 && (
          <Top3List
            data={topIncome}
            type="income"
            loading={loading}
            isFocused={isFocused}
            navigation={navigation}
          />
        )}

        {topExpense?.length !== 0 && (
          <Top3List
            data={topExpense}
            type="expense"
            loading={loading}
            isFocused={isFocused}
            navigation={navigation}
          />
        )}
      </View>
    </View>
  );
};

const TotalAmountReport = ({income, expense, loading, isFocused}: any) => {
  return (
    <>
      <View>
        <Text style={{...screenStyles.spendingAmount, color: Colors.SUCCESS}}>
          Rp {!loading && isFocused ? Helper.numberWithSeparator(income) : 0}
        </Text>
        <Text style={screenStyles.amountLabel}>Total income this month</Text>
      </View>
      <View>
        <Text
          style={{
            ...screenStyles.spendingAmount,
            color: Colors.DANGER,
            textAlign: 'right',
          }}
        >
          Rp {!loading && isFocused ? Helper.numberWithSeparator(expense) : 0}
        </Text>
        <Text style={{...screenStyles.amountLabel, textAlign: 'right'}}>
          Total spent this month
        </Text>
      </View>
    </>
  );
};

const Top3List = ({data, type, loading, isFocused, navigation}: any) => {
  return (
    <View
      style={
        type === 'income'
          ? screenStyles.topWrapper
          : {marginBottom: Mixins.scaleSize(10)}
      }
    >
      <Text
        style={{
          ...screenStyles.title,
          marginBottom: Mixins.scaleSize(18),
        }}
      >
        Top 3 {type}
      </Text>
      {loading && (
        <ActivityIndicator
          size="small"
          color={Colors.PRIMARY}
          style={{marginBottom: Mixins.scaleSize(20)}}
        />
      )}
      {!loading && isFocused && (
        <>
          {data?.map((item: any, i: number) => {
            const percentage = item.Percentage * 100;

            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('ReportTransactions', {
                    TrDateMonth: moment().format('YYYY-MM'),
                    CategoryId: item._id,
                    CategoryName: item.Category,
                  })
                }
                key={i}
              >
                <View style={screenStyles.itemList}>
                  <View style={screenStyles.rowCategory}>
                    <IconCategory
                      backgroundColor={
                        type === 'income' ? Colors.SUCCESS : Colors.DANGER
                      }
                    />
                    <View style={screenStyles.categoryContent}>
                      <Text style={screenStyles.categoryLabel}>
                        {item.Category}
                      </Text>
                      <Text style={screenStyles.amountTopLabel}>
                        Rp {Helper.numberWithSeparator(item.Total)}
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={{
                      ...screenStyles.percentTopLabel,
                      color: type === 'income' ? Colors.SUCCESS : Colors.DANGER,
                    }}
                  >
                    {percentage?.toFixed(0)}%
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </>
      )}
    </View>
  );
};

export default Layout;
