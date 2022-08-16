import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import {useForm, Controller} from 'react-hook-form';

import Input from '@components/input';
import {useActions} from '@overmind/index';
import {Colors, Helper, Mixins} from '@utils/index';

import {screenStyles} from './styles';

interface Props {
  navigation: any;
  route: any;
}

const EditForm = (props: Props) => {
  const {navigation, route} = props;

  const params = route?.params;
  const detailItem = route?.params?.item;

  const {onEditCategory} = useActions();

  const [loading, setLoading] = React.useState(false);

  // value form state
  const [Name, setName] = React.useState(detailItem?.Name);
  const [Type, setType] = React.useState(detailItem?.Type);
  const [displayLimit, setDisplayLimit] = React.useState(
    detailItem?.Limit === 0 ? '' : detailItem?.Limit,
  );
  const [Limit, setLimit] = React.useState(detailItem?.Limit);

  const headerOption = () => {
    navigation.setOptions({
      headerTitle: 'Edit Category',
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

  const onUpdate = () => {
    setLoading(true);

    let payloadP = {
      _id: detailItem?._id,
      Name,
      Type,
      Limit,
    };
    onEditCategory(payloadP)
      .then(res => {
        let {Success, Message} = res?.data;
        if (Success) {
          setLoading(false);
          showMessage({
            type: 'success',
            message: Message,
          });
          navigation.goBack();
        }
      })
      .catch(() =>
        showMessage({
          type: 'danger',
          message: 'Failed create data category',
        }),
      );
  };

  React.useEffect(() => {
    headerOption();

    if (Type === 'Income') {
      setDisplayLimit('');
      setLimit(0);
    }

    return () => {};
  }, [loading, Name, Type, displayLimit, Limit]);

  return (
    <>
      <Controller
        control={control}
        render={({field: {onChange}}) => (
          <Input
            mode="flat"
            type="text"
            label="Category name"
            value={Name}
            onChangeText={val => {
              setName(val);
              onChange(val);
            }}
            error={errors.Name}
          />
        )}
        name={'Name'}
        rules={{
          required: Name === detailItem?.Name ? false : errorMessage.form,
        }}
        defaultValue={Name}
      />
      <View style={[screenStyles.row, {marginVertical: Mixins.scaleSize(6)}]}>
        <View style={screenStyles.row}>
          <RadioButton
            value="Income"
            disabled={params?.onTransaction ? true : false}
            status={Type === 'Income' ? 'checked' : 'unchecked'}
            onPress={() => setType('Income')}
            color={Colors.SUCCESS}
          />
          <Text style={screenStyles.textRadio}>Income</Text>
        </View>
        <View style={screenStyles.row}>
          <RadioButton
            value="Expense"
            disabled={params?.onTransaction ? true : false}
            status={Type === 'Expense' ? 'checked' : 'unchecked'}
            onPress={() => setType('Expense')}
            color={Colors.DANGER}
          />
          <Text style={screenStyles.textRadio}>Expense</Text>
        </View>
      </View>
      {Type === 'Expense' && (
        <Controller
          control={control}
          render={({field: {onChange}}) => (
            <Input
              mode="flat"
              type="text"
              label="Limit (optional)"
              keyboardType="numeric"
              value={Helper.valInputWithSeparator(displayLimit)}
              onChangeText={val => {
                let noLeadZero = val?.replace(/^0+/, '0');
                let removePoint = noLeadZero?.split('.').join('');
                let toNum = parseFloat(removePoint);
                setLimit(isNaN(toNum) ? 0 : toNum);
                setDisplayLimit(noLeadZero);
                onChange(val);
              }}
            />
          )}
          name={'Limit'}
          rules={{required: false}}
          defaultValue={Limit}
        />
      )}
      {params?.onTransaction && (
        <Text style={screenStyles.labelOnTr}>
          *Can't change type category, this category used in transaction
        </Text>
      )}
    </>
  );
};

export default EditForm;
