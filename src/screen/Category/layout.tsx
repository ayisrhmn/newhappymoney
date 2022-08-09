import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text, ActivityIndicator} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons';

import {useIsFocused} from '@react-navigation/native';
import container, {ContainerContext} from '@components/container';
import IconCategory from '@components/icon-category';
import {useActions} from '@overmind/index';
import {Colors, Helper, Mixins} from '@utils/index';

import {screenStyles} from './styles';
import ModalDelete from './modal-delete';

interface Props {
  navigation: any;
}

const Layout = (props: Props) => {
  const {navigation} = props;

  const ctx = React.useContext(ContainerContext);

  const {getMyCategory, onDeleteCategory, getTopIncome, getTopExpense} =
    useActions();

  const isFocused = useIsFocused();

  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState([]) as any;
  const [selected, setSelected] = React.useState({}) as any;
  const [visible, setVisible] = React.useState(false);
  const [delLoading, setDelLoading] = React.useState(false);

  const initData = () => {
    setLoading(true);

    getMyCategory()
      .then(res => {
        setData(res);
        setLoading(false);
      })
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
  }, [isFocused, ctx.isRefreshing]);

  const dataFilterByType = (data: any, type: string) => {
    return data?.filter((o: any) => {
      return o?.Type === type;
    });
  };

  const onDelete = (item: any) => {
    const {_id, Name, Type} = item;

    setDelLoading(true);

    let payload = {
      TrDateMonth: '',
      Show: '',
    };
    if (Type === 'Income') {
      getTopIncome(payload).then(res => {
        let {Success, Data} = res.data;
        if (Success) {
          let checkData = Data.find((o: any) => o.Category === Name);
          if (checkData === undefined) {
            onDeleteCategory({_id})
              .then(res => {
                let {Success, Message} = res.data;

                if (Success) {
                  setDelLoading(false);
                  setVisible(false);
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
                  message: 'Failed delete category',
                }),
              );
          } else {
            setDelLoading(false);
            setVisible(false);
            showMessage({
              type: 'danger',
              message: 'Failed to delete, this category used in transaction',
            });
          }
        }
      });
    } else {
      getTopExpense(payload).then(res => {
        let {Success, Data} = res.data;
        if (Success) {
          let checkData = Data.find((o: any) => o.Category === Name);
          if (checkData === undefined) {
            onDeleteCategory({_id})
              .then(res => {
                let {Success, Message} = res.data;

                if (Success) {
                  setDelLoading(false);
                  setVisible(false);
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
                  message: 'Failed delete category',
                }),
              );
          } else {
            setDelLoading(false);
            setVisible(false);
            showMessage({
              type: 'danger',
              message: 'Failed to delete, this category used in transaction',
            });
          }
        }
      });
    }
  };

  return (
    <>
      <View style={screenStyles.container}>
        <View style={screenStyles.headerTitle}>
          <Text style={screenStyles.mainTitle}>List category</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CategoryForm')}>
            <Text style={screenStyles.linkTitle}>Add category</Text>
          </TouchableOpacity>
        </View>
        <View style={screenStyles.listSection}>
          {loading && (
            <ActivityIndicator
              color={Colors.PRIMARY}
              size="small"
              style={{marginVertical: Mixins.scaleSize(20)}}
            />
          )}
          {!loading && isFocused && (
            <>
              {data.length !== 0 ? (
                <>
                  <ListContent
                    title="Income"
                    data={dataFilterByType(data, 'Income')}
                    setVisible={setVisible}
                    setSelected={setSelected}
                  />
                  <ListContent
                    title="Expense"
                    data={dataFilterByType(data, 'Expense')}
                    setVisible={setVisible}
                    setSelected={setSelected}
                  />
                </>
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

      <ModalDelete
        visible={visible}
        loading={delLoading}
        category={selected?.Name}
        onClose={() => {
          setSelected({});
          setVisible(false);
        }}
        onDelete={() => onDelete(selected)}
      />
    </>
  );
};

const ListContent = ({title, data, setVisible, setSelected}: any) => {
  return (
    <View style={{marginBottom: title === 'Income' ? Mixins.scaleSize(14) : 0}}>
      <Text style={screenStyles.typeTitle}>{title}</Text>
      {data?.map((item: any, i: number) => (
        <View style={screenStyles.listItem} key={i}>
          <View style={[screenStyles.row, {alignItems: 'center'}]}>
            <View style={screenStyles.iconWrap}>
              <IconCategory
                backgroundColor={
                  item.Type === 'Income' ? Colors.SUCCESS : Colors.DANGER
                }
              />
            </View>
            <View>
              <Text style={screenStyles.category}>{item.Name}</Text>
              {item.Limit !== 0 && (
                <Text style={screenStyles.limit}>
                  Limit: Rp {Helper.numberWithSeparator(item.Limit)}
                </Text>
              )}
            </View>
          </View>
          <View style={screenStyles.row}>
            <TouchableOpacity onPress={() => console.log('edit pressed!')}>
              <Icon
                name="pencil-outline"
                color={Colors.GREY}
                size={Mixins.scaleFont(18)}
                style={{marginRight: Mixins.scaleSize(10)}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelected(item);
                setVisible(true);
              }}
            >
              <Icon
                name="trash-outline"
                color={Colors.DANGER}
                size={Mixins.scaleFont(18)}
              />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

export default container(Layout);
