import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import {useForm} from 'react-hook-form';

import Input from '@components/input';
import {useActions} from '@overmind/index';
import {Colors, Helper, Mixins} from '@utils/index';

import {screenStyles} from './styles';

interface Props {
  navigation: any;
  route: any;
}

const CreateForm = (props: Props) => {
  const {navigation} = props;

  const {onCreateCategory} = useActions();

  const [loading, setLoading] = React.useState(false);

  // value form state
  const [Type, setType] = React.useState('Income');
  const [displayLimit, setDisplayLimit] = React.useState('');
  const [Limit, setLimit] = React.useState(0);

  const headerOption = () => {
    navigation.setOptions({
      headerTitle: 'Add category',
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
    register('Name', {required: 'This field is required'});

    return () => {};
  }, [register]);

  const onCreate = (val: any) => {
    setLoading(true);

    let payload = {
      Name: val?.Name,
      Type,
      Limit,
    };
    onCreateCategory(payload)
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
  }, [loading, Type, displayLimit, Limit]);

  return (
    <>
      <Input
        mode="flat"
        type="text"
        label="Category name"
        onChangeText={val => setValue('Name', val, {shouldValidate: true})}
        error={errors.Name}
      />
      <View style={[screenStyles.row, {marginVertical: Mixins.scaleSize(6)}]}>
        <View style={screenStyles.row}>
          <RadioButton
            value="Income"
            status={Type === 'Income' ? 'checked' : 'unchecked'}
            onPress={() => setType('Income')}
            color={Colors.SUCCESS}
          />
          <Text style={screenStyles.textRadio}>Income</Text>
        </View>
        <View style={screenStyles.row}>
          <RadioButton
            value="Expense"
            status={Type === 'Expense' ? 'checked' : 'unchecked'}
            onPress={() => setType('Expense')}
            color={Colors.DANGER}
          />
          <Text style={screenStyles.textRadio}>Expense</Text>
        </View>
      </View>
      {Type === 'Expense' && (
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
          }}
        />
      )}
    </>
  );
};

export default CreateForm;
