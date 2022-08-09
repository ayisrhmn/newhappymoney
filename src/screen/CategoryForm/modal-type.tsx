import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

import Modal from '@components/modal';
import {Colors, Mixins} from '@utils/index';

import {screenStyles} from './styles';

interface Props {
  visible: boolean;
  onClose: Function | any;
  incomeSelect: Function | any;
  expenseSelect: Function | any;
  selected: any;
}

const ModalType = (props: Props) => {
  return (
    <Modal
      show={props?.visible}
      showCloseButton={true}
      loading={false}
      onClose={props?.onClose}
    >
      <View style={screenStyles.modalContainer}>
        <Text style={screenStyles.modalTitle}>Type category</Text>
        <View style={{marginTop: Mixins.scaleSize(16)}}>
          <TouchableOpacity onPress={props?.incomeSelect}>
            <View style={screenStyles.itemWrap}>
              <Text style={screenStyles.itemLabel}>Income</Text>
              <Icon
                name={
                  props?.selected === 'Income'
                    ? 'checkmark-circle'
                    : 'checkmark-circle-outline'
                }
                color={
                  props?.selected === 'Income' ? Colors.SUCCESS : Colors.GREY
                }
                size={Mixins.scaleFont(24)}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={props?.expenseSelect}>
            <View style={screenStyles.itemWrap}>
              <Text style={screenStyles.itemLabel}>Expense</Text>
              <Icon
                name={
                  props?.selected === 'Expense'
                    ? 'checkmark-circle'
                    : 'checkmark-circle-outline'
                }
                color={
                  props?.selected === 'Expense' ? Colors.SUCCESS : Colors.GREY
                }
                size={Mixins.scaleFont(24)}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalType;
