import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {Text, ActivityIndicator} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons';

import {useIsFocused} from '@react-navigation/native';
import container, {ContainerContext} from '@components/container';
import Modal from '@components/modal';
import {useActions} from '@overmind/index';
import {Colors, Helper, Mixins} from '@utils/index';

import ModalDate from './modal-date';
import {screenStyles} from './styles';

import moment from 'moment';
import ModalDetail from './modal-detail';
import ModalDelete from './modal-delete';

interface Props {
  navigation: any;
}

const Layout = (props: Props) => {
  const {navigation} = props;

  const ctx = React.useContext(ContainerContext);

  const {getMyTransactions, getMyCategory, onDeleteTransaction} = useActions();

  const isFocused = useIsFocused();

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]) as any;

  const [openDetail, setOpenDetail] = React.useState(false);
  const [detail, setDetail] = React.useState({}) as any;

  const [openDelete, setOpenDelete] = React.useState(false);
  const [delLoading, setDelLoading] = React.useState(false);

  const [openFilter, setOpenFilter] = React.useState(false);
  const [filter, setFilter] = React.useState({
    TrDateMonth: moment().format('YYYY-MM'),
    Show: '',
    Sort: 'Newest',
    Type: '',
    Category: '',
  });
  const [payload, setPayload] = React.useState(filter);
  const [category, setCategory] = React.useState([]) as any;

  const [openDate, setOpenDate] = React.useState(false);
  const [date, setDate] = React.useState(moment().format('YYYY/MM'));
  const [displayDate, setDisplayDate] = React.useState(
    moment().format('MMMM YYYY'),
  );

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

    getMyCategory()
      .then(res => setCategory(res))
      .catch(() =>
        showMessage({
          type: 'danger',
          message: 'Failed load data category',
        }),
      );
  };

  React.useEffect(() => {
    if (isFocused || (isFocused && ctx.isRefreshing)) {
      initData();
    }

    return () => {};
  }, [isFocused, ctx.isRefreshing, payload]);

  const getCategoryName = (_id: any) => {
    let ct = category.find((o: any) => {
      return o._id === _id;
    });

    return ct?.Name;
  };

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
          <Text style={screenStyles.mainTitle}>List transactions</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('TransactionForm')}
          >
            <Text style={screenStyles.linkTitle}>Add transaction</Text>
          </TouchableOpacity>
        </View>
        <View style={screenStyles.headerFilter}>
          <TouchableOpacity
            disabled={!loading ? false : true}
            onPress={() => setOpenFilter(true)}
          >
            <View style={[screenStyles.row, {alignItems: 'center'}]}>
              <Icon
                name="filter"
                color={Colors.GREY}
                size={Mixins.scaleFont(14)}
                style={{marginRight: Mixins.scaleSize(5)}}
              />
              <Text style={screenStyles.textFilter}>
                {`${payload?.Sort}${
                  payload?.Type !== '' ? `, ${payload?.Type}` : ''
                }${
                  payload?.Category !== ''
                    ? `, ${getCategoryName(payload?.Category)}`
                    : ''
                }`}
              </Text>
            </View>
          </TouchableOpacity>
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

      <Modal
        show={openFilter}
        showCloseButton={false}
        loading={false}
        onClose={() => {
          setFilter(payload);
          setOpenFilter(false);
        }}
      >
        <View style={screenStyles.modalContainer}>
          <View
            style={[
              screenStyles.row,
              {justifyContent: 'space-between', alignItems: 'center'},
            ]}
          >
            <Text style={screenStyles.filterTitle}>Filter by</Text>
            <TouchableOpacity
              onPress={() =>
                setFilter({
                  ...filter,
                  Sort: 'Newest',
                  Type: '',
                  Category: '',
                })
              }
            >
              <Text style={screenStyles.resetFilter}>Reset filter</Text>
            </TouchableOpacity>
          </View>
          <ModalContentFilter
            filter={filter}
            setFilter={setFilter}
            category={category}
            onSubmit={() => {
              setPayload(filter);
              setOpenFilter(false);
            }}
            onCancel={() => {
              setFilter(payload);
              setOpenFilter(false);
            }}
          />
        </View>
      </Modal>

      <ModalDate
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
          setFilter({...filter, TrDateMonth: valueDate});
          setPayload({...payload, TrDateMonth: valueDate});
          setOpenDate(false);
        }}
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
      keyExtractor={(item: any, i: number) => `${item._id}_${i}`}
      renderItem={({item, index}) => (
        <View
          style={
            index === 0
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

const ModalContentFilter = ({
  filter,
  setFilter,
  category,
  onSubmit,
  onCancel,
}: any) => {
  return (
    <View style={screenStyles.modalContent}>
      <View style={screenStyles.modalSection}>
        <Text style={screenStyles.modalSectionTitle}>Sort</Text>
        <View style={[screenStyles.row, {flexWrap: 'wrap'}]}>
          <TouchableOpacity
            onPress={() => setFilter({...filter, Sort: 'Oldest'})}
          >
            <View
              style={
                filter?.Sort === 'Oldest'
                  ? [screenStyles.btnFilter, screenStyles.btnFilterSelected]
                  : screenStyles.btnFilter
              }
            >
              <Text
                style={
                  filter?.Sort === 'Oldest'
                    ? {...screenStyles.txtFilter, color: Colors.WHITE}
                    : {...screenStyles.txtFilter}
                }
              >
                Oldest
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter({...filter, Sort: 'Newest'})}
          >
            <View
              style={
                filter?.Sort === 'Newest'
                  ? [screenStyles.btnFilter, screenStyles.btnFilterSelected]
                  : screenStyles.btnFilter
              }
            >
              <Text
                style={
                  filter?.Sort === 'Newest'
                    ? {...screenStyles.txtFilter, color: Colors.WHITE}
                    : {...screenStyles.txtFilter}
                }
              >
                Newest
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={screenStyles.modalSection}>
        <Text style={screenStyles.modalSectionTitle}>Type</Text>
        <View style={[screenStyles.row, {flexWrap: 'wrap'}]}>
          <TouchableOpacity onPress={() => setFilter({...filter, Type: ''})}>
            <View
              style={
                filter?.Type === ''
                  ? [screenStyles.btnFilter, screenStyles.btnFilterSelected]
                  : screenStyles.btnFilter
              }
            >
              <Text
                style={
                  filter?.Type === ''
                    ? {...screenStyles.txtFilter, color: Colors.WHITE}
                    : {...screenStyles.txtFilter}
                }
              >
                All
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter({...filter, Type: 'Income'})}
          >
            <View
              style={
                filter?.Type === 'Income'
                  ? [screenStyles.btnFilter, screenStyles.btnFilterSelected]
                  : screenStyles.btnFilter
              }
            >
              <Text
                style={
                  filter?.Type === 'Income'
                    ? {...screenStyles.txtFilter, color: Colors.WHITE}
                    : {...screenStyles.txtFilter}
                }
              >
                Income
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFilter({...filter, Type: 'Expense'})}
          >
            <View
              style={
                filter?.Type === 'Expense'
                  ? [screenStyles.btnFilter, screenStyles.btnFilterSelected]
                  : screenStyles.btnFilter
              }
            >
              <Text
                style={
                  filter?.Type === 'Expense'
                    ? {...screenStyles.txtFilter, color: Colors.WHITE}
                    : {...screenStyles.txtFilter}
                }
              >
                Expense
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={screenStyles.modalSection}>
        <Text style={screenStyles.modalSectionTitle}>Category</Text>
        <View style={[screenStyles.row, {flexWrap: 'wrap'}]}>
          <TouchableOpacity
            onPress={() => setFilter({...filter, Category: ''})}
          >
            <View
              style={
                filter?.Category === ''
                  ? [screenStyles.btnFilter, screenStyles.btnFilterSelected]
                  : screenStyles.btnFilter
              }
            >
              <Text
                style={
                  filter?.Category === ''
                    ? {...screenStyles.txtFilter, color: Colors.WHITE}
                    : {...screenStyles.txtFilter}
                }
              >
                All
              </Text>
            </View>
          </TouchableOpacity>
          {category
            .filter((o: any) =>
              filter?.Type !== '' ? o?.Type === filter?.Type : o?.Type,
            )
            .sort((a: any, b: any) => {
              let dataSort = ['Income', 'Expense'];
              return dataSort?.indexOf(a?.Type) - dataSort?.indexOf(b?.Type);
            })
            .map((item: any, i: number) => (
              <TouchableOpacity
                onPress={() => setFilter({...filter, Category: item._id})}
                key={i}
              >
                <View
                  style={
                    filter?.Category === item._id
                      ? [screenStyles.btnFilter, screenStyles.btnFilterSelected]
                      : screenStyles.btnFilter
                  }
                >
                  <Text
                    style={
                      filter?.Category === item._id
                        ? {...screenStyles.txtFilter, color: Colors.WHITE}
                        : {...screenStyles.txtFilter}
                    }
                  >
                    {item.Name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </View>

      <View style={screenStyles.actions}>
        <View style={screenStyles.row}>
          <TouchableOpacity onPress={onSubmit}>
            <Text style={{...screenStyles.actYes, color: Colors.PRIMARY}}>
              Submit
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onCancel}>
            <Text style={screenStyles.actNo}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default container(Layout, false);
