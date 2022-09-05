import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import {useForm} from 'react-hook-form';
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

const CreateForm = (props: Props) => {
  const {navigation} = props;

  const {getMyCategory, onCreateTransaction} = useActions();

  const [loading, setLoading] = React.useState(false);

  // value form state
  const [displayAmount, setDisplayAmount] = React.useState('');

  const [openCategory, setOpenCategory] = React.useState(false);
  const [category, setCategory] = React.useState([]) as any;
  const [ctSelected, setCtSelected] = React.useState({}) as any;

  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [dateValue, setDateValue] = React.useState(new Date());
  const [displayDate, setDisplayDate] = React.useState('');

  const headerOption = () => {
    navigation.setOptions({
      headerTitle: 'Add transaction',
      headerRight: () => {
        return (
          <TouchableOpacity
            disabled={loading ? true : false}
            onPress={() => handleSubmit(onCreate)()}
            style={screenStyles.headerRightWrap}
          >
            <Text style={screenStyles.headerRightAction}>
              {!loading ? 'Save' : 'Creating'}
            </Text>
          </TouchableOpacity>
        );
      },
    });
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();

  React.useEffect(() => {
    register('Title', {required: 'This field is required'});
    register('Category', {required: 'This field is required'});
    register('Amount', {required: 'This field is required'});
    register('TrDate', {required: 'This field is required'});

    return () => {};
  }, [register]);

  const initData = () => {
    getMyCategory()
      .then(res => setCategory(res))
      .catch(() =>
        showMessage({
          type: 'danger',
          message: 'Failed load data category',
        }),
      );
  };

  const onCreate = (val: any) => {
    setLoading(true);

    let payload = {
      Title: val?.Title,
      Note: val?.Note,
      Category: val?.Category,
      Amount: val?.Amount,
      TrDateMonth: val?.TrDateMonth,
      TrDate: val?.TrDate,
    };
    onCreateTransaction(payload)
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
          message: 'Failed create data transaction',
        }),
      );
  };

  React.useEffect(() => {
    headerOption();
    initData();

    return () => {};
  }, [loading]);

  const confirmDatePicker = (d: Date) => {
    setShowDatePicker(false);

    let displayD = moment(d).format('DD MMMM YYYY');
    let TrDate = moment(d).format('YYYY-MM-DD');
    let TrDateMonth = moment(d).format('YYYY-MM');
    setDisplayDate(displayD);
    setDateValue(d);
    setValue('TrDate', TrDate, {shouldValidate: true});
    setValue('TrDateMonth', TrDateMonth, {shouldValidate: false});
  };

  return (
    <>
      <Input
        mode="flat"
        type="text"
        label="Title transaction"
        onChangeText={val => setValue('Title', val, {shouldValidate: true})}
        error={errors.Title}
      />
      <Input
        mode="flat"
        type="text"
        label="Note (optional)"
        onChangeText={val => setValue('Note', val, {shouldValidate: false})}
      />
      <Input
        mode="flat"
        type="button"
        label="Select category"
        value={ctSelected?.Name === undefined ? '' : ctSelected?.Name}
        onPress={() => setOpenCategory(true)}
        error={errors.Category}
      />
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
          setValue('Amount', isNaN(toNum) ? 0 : toNum, {shouldValidate: true});
          setDisplayAmount(noLeadZero);
        }}
        error={errors.Amount}
      />
      <Input
        mode="flat"
        type="button"
        label="Select date"
        value={displayDate}
        onPress={() => setShowDatePicker(true)}
        error={errors.TrDate}
      />

      <ModalCategory
        visible={openCategory}
        category={category}
        setOpenCategory={setOpenCategory}
        setCtSelected={setCtSelected}
        ctSelected={ctSelected}
        setValue={setValue}
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
  setValue,
}: any) => {
  const incomeCategory = category?.filter((o: any) => o.Type === 'Income');
  const expenseCategory = category?.filter((o: any) => o.Type === 'Expense');

  return (
    <Modal
      show={visible}
      loading={false}
      showCloseButton={true}
      onClose={() => setOpenCategory(false)}
    >
      <View style={screenStyles.modalCategoryContainer}>
        <Text style={screenStyles.modalTitleCategory}>Select category</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{marginBottom: Mixins.scaleSize(16)}}>
            <Text style={{...screenStyles.typeCategory, color: Colors.SUCCESS}}>
              Income
            </Text>
            {incomeCategory?.map((item: any, i: any) => (
              <TouchableOpacity
                onPress={() => {
                  setCtSelected(item);
                  setValue('Category', item._id, {shouldValidate: true});
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
            {expenseCategory?.map((item: any, i: any) => (
              <TouchableOpacity
                onPress={() => {
                  setCtSelected(item);
                  setValue('Category', item._id, {shouldValidate: true});
                  setOpenCategory(false);
                }}
                key={i}
              >
                <View
                  style={
                    i === expenseCategory.length - 1
                      ? {
                          ...screenStyles.rowCategory,
                          marginBottom: Mixins.scaleSize(24),
                        }
                      : screenStyles.rowCategory
                  }
                >
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
        </ScrollView>
      </View>
    </Modal>
  );
};

export default CreateForm;
