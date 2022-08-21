import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Text, ActivityIndicator} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons';

import {useIsFocused} from '@react-navigation/native';
import container from '@components/container';
import {useActions} from '@overmind/index';
import {Colors, Helper, Mixins} from '@utils/index';

import {screenStyles} from './styles';
import ModalDetail from './modal-detail';
import ModalDelete from './modal-delete';

import moment from 'moment';

interface Props {
  navigation: any;
  route: any;
}

const Layout = (props: Props) => {
  const {navigation, route} = props;

  const params = route?.params;

  const {getMyTransactions, onDeleteTransaction} = useActions();

  const isFocused = useIsFocused();

  const payload = {
    TrDateMonth: params?.TrDateMonth,
    Show: '',
    Sort: 'Newest',
    Type: '',
    Category: params?.CategoryId,
  };

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]) as any;

  const [openDetail, setOpenDetail] = React.useState(false);
  const [detail, setDetail] = React.useState({}) as any;

  const [openDelete, setOpenDelete] = React.useState(false);
  const [delLoading, setDelLoading] = React.useState(false);

  const initData = () => {
    setDetail({});
    setLoading(true);

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
    if (isFocused) {
      initData();
    }

    return () => {};
  }, [isFocused]);

  const onDelete = (_id: any) => {
    setDelLoading(true);

    onDeleteTransaction({_id})
      .then(res => {
        let {Success, Message} = res.data;

        if (Success) {
          setDelLoading(false);
          setOpenDelete(false);
          showMessage({
            type: 'success',
            message: Message,
          });
          initData();
        }
      })
      .catch(() =>
        showMessage({
          type: 'danger',
          message: 'Failed delete transaction',
        }),
      );
  };

  return (
    <>
      <View style={screenStyles.container}>
        <View style={screenStyles.headerTitle}>
          <Text style={screenStyles.mainTitle}>
            Transactions ({params?.CategoryName})
          </Text>
          <View style={[screenStyles.row, {alignItems: 'center'}]}>
            <Icon
              name="calendar-outline"
              color={Colors.GREY}
              size={Mixins.scaleFont(14)}
              style={{marginRight: Mixins.scaleSize(5)}}
            />
            <Text style={screenStyles.textFilter}>
              {moment(params?.TrDateMonth).format('MMMM YYYY')}
            </Text>
          </View>
        </View>
        <View style={screenStyles.listSection}>
          {loading && (
            <ActivityIndicator
              color={Colors.PRIMARY}
              size="small"
              style={{marginVertical: Mixins.scaleSize(34)}}
            />
          )}
          {!loading && isFocused && (
            <>
              {data?.length !== 0 ? (
                <ListTransactions
                  data={data}
                  initData={initData}
                  setDetail={setDetail}
                  setOpenDetail={setOpenDetail}
                />
              ) : (
                <View style={screenStyles.noDataWrapper}>
                  <Text style={screenStyles.noDataText}>
                    No transaction data
                  </Text>
                </View>
              )}
            </>
          )}
        </View>
      </View>

      <ModalDetail
        visible={openDetail}
        onClose={() => setOpenDetail(false)}
        item={detail}
        onPressEdit={() => {
          navigation.navigate('TransactionForm', {
            isEdit: true,
            detail,
          });
          setOpenDetail(false);
        }}
        onPressDelete={() => {
          setOpenDetail(false);
          setOpenDelete(true);
        }}
      />

      <ModalDelete
        visible={openDelete}
        loading={delLoading}
        trTitle={detail?.Title}
        onClose={() => setOpenDelete(false)}
        onPressDelete={() => onDelete(detail?._id)}
      />
    </>
  );
};

const ListTransactions = ({data, initData, setDetail, setOpenDetail}: any) => {
  return (
    <FlatList
      refreshing={false}
      onRefresh={() => initData()}
      data={data}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item: any) => `${item._id}`}
      renderItem={({item, index}) => (
        <View
          style={
            data.length === 1
              ? [screenStyles.itemList, {paddingVertical: Mixins.scaleSize(16)}]
              : index === 0
              ? [screenStyles.itemList, {paddingTop: Mixins.scaleSize(16)}]
              : index === data.length - 1
              ? [screenStyles.itemList, {paddingBottom: Mixins.scaleSize(16)}]
              : screenStyles.itemList
          }
        >
          <TouchableOpacity
            onPress={() => {
              setDetail(item);
              setOpenDetail(true);
            }}
            style={screenStyles.trList}
          >
            <View>
              <Text style={screenStyles.categoryLabel}>{item.Title}</Text>
              <Text style={screenStyles.categoryTrLabel}>
                {item.Category.Name}
              </Text>
              <Text style={screenStyles.trDateLabel}>
                {moment(item.TrDate).format('DD MMMM YYYY')}
              </Text>
            </View>
            <Text
              style={{
                ...screenStyles.amountTr,
                color:
                  item.Category.Type === 'Income'
                    ? Colors.SUCCESS
                    : Colors.DANGER,
              }}
            >
              Rp {Helper.numberWithSeparator(item.Amount)}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default container(Layout, false);
