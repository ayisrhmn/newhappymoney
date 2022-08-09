import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import {showMessage} from 'react-native-flash-message';
import {useIsFocused} from '@react-navigation/native';
import {useForm} from 'react-hook-form';

import container from '@components/container';
import Input from '@components/input';
import {useActions} from '@overmind/index';
import {Helper} from '@utils/index';

import {screenStyles} from './styles';
import ModalType from './modal-type';

interface Props {
  navigation: any;
}

const Layout = (props: Props) => {
  const {navigation} = props;

  const {onCreateCategory} = useActions();

  const isFocused = useIsFocused();

  const [loading, setLoading] = React.useState(false);
  const [displayLimit, setDisplayLimit] = React.useState('');
  const [selected, setSelected] = React.useState('');

  const [visible, setVisible] = React.useState(false);

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
              {!loading ? 'Save' : 'Processing'}
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
    register('Type', {required: 'This field is required'});
    if (selected === 'Expense') {
      register('Limit', {required: 'This field is required'});
    }

    return () => {};
  }, [register, selected]);

  const onCreate = (val: any) => {
    setLoading(true);

    let payload = {
      Name: val?.Name,
      Type: val?.Type,
      Limit: val?.Limit === undefined ? 0 : parseInt(val?.Limit),
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
    if (isFocused) {
      headerOption();
    }

    return () => {};
  }, [isFocused, loading]);

  return (
    <>
      <View style={screenStyles.container}>
        <Input
          mode="flat"
          type="text"
          label="Category name"
          onChangeText={val => setValue('Name', val, {shouldValidate: true})}
          error={errors.Name}
        />
        <Input
          mode="flat"
          type="button"
          label="Type category"
          value={selected}
          onPress={() => setVisible(true)}
          error={errors.Type}
        />
        {selected === 'Expense' && (
          <Input
            mode="flat"
            type="text"
            label="Limit"
            keyboardType="numeric"
            value={Helper.valInputWithSeparator(displayLimit)}
            onChangeText={val => {
              setValue('Limit', val, {
                shouldValidate: selected === 'Expense' ? true : false,
              });
              setDisplayLimit(val);
            }}
            error={errors.Limit}
          />
        )}
      </View>

      <ModalType
        visible={visible}
        onClose={() => setVisible(false)}
        incomeSelect={() => {
          setSelected('Income');
          setValue('Type', 'Income', {shouldValidate: true});
          setVisible(false);
        }}
        expenseSelect={() => {
          setSelected('Expense');
          setValue('Type', 'Expense', {shouldValidate: true});
          setVisible(false);
        }}
        selected={selected}
      />
    </>
  );
};

export default container(Layout, false);
