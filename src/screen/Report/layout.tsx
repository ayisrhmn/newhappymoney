import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons';

import {useIsFocused} from '@react-navigation/native';
import container, {ContainerContext} from '@components/container';
import ProgressChart from '@components/progress-chart';
import IconCategory from '@components/icon-category';
import ModalDateMonth from '@components/modal-datemonth';
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

  const {getMyBalance, getMySpendingReport, getTopIncome, getTopExpense} =
    useActions();
  const {showNextMonth} = useState();

  const isFocused = useIsFocused();

  const [loading, setLoading] = React.useState(false);
  const [balance, setBalance] = React.useState(0);
  const [spending, setSpending] = React.useState({}) as any;
  const [topIncome, setTopIncome] = React.useState([]) as any;
  const [topExpense, setTopExpense] = React.useState([]) as any;

  const [openDate, setOpenDate] = React.useState(false);
  const [date, setDate] = React.useState(
    showNextMonth
      ? Helper.currentWithLastdateCondition('filter')
      : moment().format('YYYY/MM'),
  );
  const [displayDate, setDisplayDate] = React.useState(
    showNextMonth
      ? moment().add(1, 'month').format('MMMM YYYY')
      : moment().format('MMMM YYYY'),
  );
  const [TrDateMonth, setTrDateMonth] = React.useState(
    showNextMonth
      ? Helper.currentWithLastdateCondition('payload')
      : moment().format('YYYY-MM'),
  );

  const initData = () => {
    setLoading(true);
    setBalance(0);

    let payload = {
      TrDateMonth,
      Show: '',
    };
    Promise.all([
      getMyBalance(payload),
      getMySpendingReport(payload),
      getTopIncome(payload),
      getTopExpense(payload),
    ])
      .then(res => {
        let [my_balance, spending_report, top_income, top_expense] = res;

        if (my_balance) {
          setBalance(my_balance);
        }

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
  }, [isFocused, ctx.isRefreshing, TrDateMonth, showNextMonth]);

  const percentIn = isNaN(spending.PercentageIn * 100)
    ? 0
    : spending.PercentageIn * 100;
  const percentEx = isNaN(spending.PercentageEx * 100)
    ? 0
    : spending.PercentageEx * 100;

  return (
    <>
      <View style={screenStyles.container}>
        <View style={screenStyles.headerContainer}>
          <View style={screenStyles.row}>
            <Text style={screenStyles.balanceLabel}>Balance:</Text>
            <Text style={screenStyles.balanceValue}>
              Rp{' '}
              {!loading && isFocused ? Helper.numberWithSeparator(balance) : 0}
            </Text>
          </View>
          <TouchableOpacity
            disabled={!loading ? false : true}
            onPress={() => setOpenDate(true)}
          >
            <View style={[screenStyles.row, {alignItems: 'center'}]}>
              <Icon
                name="calendar-outline"
                color={Colors.GREY}
                size={Mixins.scaleFont(14)}
                style={{marginRight: Mixins.scaleSize(5)}}
              />
              <Text style={screenStyles.textFilter}>{displayDate}</Text>
            </View>
          </TouchableOpacity>
        </View>
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
          <TopList
            data={topIncome}
            type="income"
            loading={loading}
            isFocused={isFocused}
            navigation={navigation}
            TrDateMonth={TrDateMonth}
          />
        )}

        {topExpense?.length !== 0 && (
          <TopList
            data={topExpense}
            type="expense"
            loading={loading}
            isFocused={isFocused}
            navigation={navigation}
            TrDateMonth={TrDateMonth}
          />
        )}
      </View>

      <ModalDateMonth
        visible={openDate}
        onClose={() => {
          setOpenDate(false);
        }}
        value={date}
        onMonthYearChange={(selectedDate: any) => {
          let date = selectedDate.replace(' ', '/');
          let valueDate = selectedDate.replace(' ', '-');
          let displayDate = moment(valueDate).format('MMMM YYYY');

          setDate(date);
          setDisplayDate(displayDate);
          setTrDateMonth(valueDate);
          setOpenDate(false);
        }}
      />
    </>
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

const TopList = ({
  data,
  type,
  loading,
  isFocused,
  navigation,
  TrDateMonth,
}: any) => {
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
        Top {type}
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
                    TrDateMonth,
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

export default container(Layout);
