import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import {useForm, Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Input from '@components/input';
import Modal from '@components/modal';
import {useActions} from '@overmind/index';
import {Colors, Helper, Mixins} from '@utils/index';

import moment from 'moment';

import {screenStyles} from './styles';

interface Props {
  navigation: any;
  route: any;
}

const EditForm = (props: Props) => {
  const {navigation, route} = props;

  const params = route?.params;
  const detail = route?.params?.detail;

  const {getMyCategory, onEditTransaction} = useActions();

  const [loading, setLoading] = React.useState(false);

  // value form state
  const [Title, setTitle] = React.useState(detail?.Title);
  const [Note, setNote] = React.useState(detail?.Note);
  const [Category, setCategory] = React.useState(detail?.Category?._id);
  const [displayAmount, setDisplayAmount] = React.useState(detail?.Amount);
  const [Amount, setAmount] = React.useState(detail?.Amount);
  const [TrDateMonth, setTrDateMonth] = React.useState(detail?.TrDateMonth);
  const [TrDate, setTrDate] = React.useState(detail?.TrDate);

  const [openCategory, setOpenCategory] = React.useState(false);
  const [ctData, setCtData] = React.useState([]) as any;
  const [ctSelected, setCtSelected] = React.useState(detail?.Category) as any;

  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [dateValue, setDateValue] = React.useState(new Date(detail?.TrDate));
  const [displayDate, setDisplayDate] = React.useState(
    moment(detail?.TrDate).format('DD MMMM YYYY'),
  );

  const headerOption = () => {
    navigation.setOptions({
      headerTitle: 'Edit transaction',
      headerRight: () => {
        return (
          <TouchableOpacity
            disabled={loading ? true : false}
            onPress={() => handleSubmit(onUpdate)()}
            style={screenStyles.headerRightWrap}
          >
            <Text style={screenStyles.headerRightAction}>
              {!loading ? 'Save' : 'Updating'}
            </Text>
          </TouchableOpacity>
        );
      },
    });
  };

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm();

  const errorMessage = {
    form: 'This field is required',
  };

  const initData = () => {
    getMyCategory()
      .then(res => setCtData(res))
      .catch(() =>
        showMessage({
          type: 'danger',
          message: 'Failed load data category',
        }),
      );
  };

  const onUpdate = () => {
    setLoading(true);

    let payloadP = {
      _id: detail?._id,
      Title,
      Note,
      Category,
      Amount,
      TrDateMonth,
      TrDate,
    };
    onEditTransaction(payloadP)
      .then(res => {
        let {Success, Message} = res?.data;
        if (Success) {
          setLoading(false);
          showMessage({
            type: 'success',
            message: Message,
          });
          navigation.goBack();
          return;
        }
      })
      .catch(() =>
        showMessage({
          type: 'danger',
          message: 'Failed update data transaction',
        }),
      );
  };

  React.useEffect(() => {
    headerOption();
    initData();

    return () => {};
  }, [
    loading,
    Title,
    Note,
    displayAmount,
    Amount,
    Category,
    TrDate,
    TrDateMonth,
  ]);

  const confirmDatePicker = (d: Date) => {
    setShowDatePicker(false);

    let displayD = moment(d).format('DD MMMM YYYY');
    let TrDate = moment(d).format('YYYY-MM-DD');
    let TrDateMonth = moment(d).format('YYYY-MM');
    setDisplayDate(displayD);
    setDateValue(d);
    setTrDate(TrDate);
    setTrDateMonth(TrDateMonth);
  };

  return (
    <>
      <Controller
        control={control}
        render={({field: {onChange}}) => (
          <Input
            mode="flat"
            type="text"
            label="Title transaction"
            value={Title}
            onChangeText={val => {
              setTitle(val);
              onChange(val);
            }}
            error={errors.Title}
          />
        )}
        name={'Title'}
        rules={{
          required: Title === detail?.Title ? false : errorMessage.form,
        }}
        defaultValue={Title}
      />
      <Controller
        control={control}
        render={({field: {onChange}}) => (
          <Input
            mode="flat"
            type="text"
            label="Note (optional)"
            value={Note}
            onChangeText={val => {
              setNote(val);
              onChange(val);
            }}
          />
        )}
        name={'Note'}
        rules={{
          required: false,
        }}
        defaultValue={Note}
      />
      <Input
        mode="flat"
        type="button"
        label="Select category"
        value={ctSelected?.Name}
        onPress={() => setOpenCategory(true)}
      />
      <Controller
        control={control}
        render={({field: {onChange}}) => (
          <Input
            mode="flat"
            type="text"
            label="Amount"
            keyboardType="numeric"
            value={Helper.valInputWithSeparator(displayAmount)}
            onChangeText={val => {
              let noLeadZero = val?.replace(/^0+/, '0');
              let removePoint = noLeadZero?.split('.').join('');
              let toNum = parseFloat(removePoint);
              setAmount(isNaN(toNum) ? 0 : toNum);
              setDisplayAmount(noLeadZero);
              onChange(val);
            }}
            error={errors.Amount}
          />
        )}
        name={'Amount'}
        rules={{
          required: Amount === detail?.Amount ? false : errorMessage.form,
        }}
        defaultValue={Amount}
      />
      <Input
        mode="flat"
        type="button"
        label="Select date"
        value={displayDate}
        onPress={() => setShowDatePicker(true)}
      />

      <ModalCategory
        visible={openCategory}
        category={ctData}
        setOpenCategory={setOpenCategory}
        setCtSelected={setCtSelected}
        ctSelected={ctSelected}
        setCategory={setCategory}
      />
      <DateTimePickerModal
        isVisible={showDatePicker}
        date={dateValue}
        mode={'date'}
        onConfirm={confirmDatePicker}
        onCancel={() => setShowDatePicker(false)}
      />
    </>
  );
};

const ModalCategory = ({
  visible,
  category,
  setOpenCategory,
  setCtSelected,
  ctSelected,
  setCategory,
}: any) => {
  return (
    <Modal
      show={visible}
      loading={false}
      showCloseButton={true}
      onClose={() => setOpenCategory(false)}
    >
      <View style={{padding: Mixins.scaleSize(14)}}>
        <Text style={screenStyles.modalTitleCategory}>Select category</Text>
        <View style={{marginBottom: Mixins.scaleSize(16)}}>
          <Text style={{...screenStyles.typeCategory, color: Colors.SUCCESS}}>
            Income
          </Text>
          {category
            ?.filter((o: any) => o.Type === 'Income')
            ?.map((item: any, i: any) => (
              <TouchableOpacity
                onPress={() => {
                  setCtSelected(item);
                  setCategory(item._id);
                  setOpenCategory(false);
                }}
                key={i}
              >
                <View style={screenStyles.rowCategory}>
                  <Text style={screenStyles.nameCategory}>{item.Name}</Text>
                  {ctSelected?._id === item._id ? (
                    <Icon
                      name="checkmark-circle"
                      color={Colors.PRIMARY}
                      size={Mixins.scaleFont(20)}
                    />
                  ) : (
                    <Icon
                      name="checkmark-circle-outline"
                      color={Colors.GREY}
                      size={Mixins.scaleFont(20)}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
        </View>
        <View>
          <Text style={{...screenStyles.typeCategory, color: Colors.DANGER}}>
            Expense
          </Text>
          {category
            ?.filter((o: any) => o.Type === 'Expense')
            ?.map((item: any, i: any) => (
              <TouchableOpacity
                onPress={() => {
                  setCtSelected(item);
                  setCategory(item._id);
                  setOpenCategory(false);
                }}
                key={i}
              >
                <View style={screenStyles.rowCategory}>
                  <Text style={screenStyles.nameCategory}>{item.Name}</Text>
                  {ctSelected?._id === item._id ? (
                    <Icon
                      name="checkmark-circle"
                      color={Colors.PRIMARY}
                      size={Mixins.scaleFont(20)}
                    />
                  ) : (
                    <Icon
                      name="checkmark-circle-outline"
                      color={Colors.GREY}
                      size={Mixins.scaleFont(20)}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </Modal>
  );
};

export default EditForm;
