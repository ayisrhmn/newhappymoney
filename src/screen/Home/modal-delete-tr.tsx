import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';

import Modal from '@components/modal';

import {screenStyles} from './styles';

interface Props {
  visible: boolean;
  loading: boolean;
  onClose: Function | any;
  trTitle: string;
  onPressDelete: Function | any;
}

const ModalDeleteTr = (props: Props) => {
  return (
    <Modal
      show={props?.visible}
      showCloseButton={true}
      loading={props?.loading}
      onClose={props?.onClose}
    >
      <View style={screenStyles.modalContainer}>
        <Text style={screenStyles.modalTitle}>
          Are you sure delete{' '}
          <Text style={screenStyles.modalTrTitle}>{props?.trTitle}</Text>{' '}
          transaction?
        </Text>
        <View style={screenStyles.actions}>
          <View style={screenStyles.row}>
            <TouchableOpacity onPress={props?.onPressDelete}>
              <Text style={screenStyles.actYes}>Yes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props?.onClose}>
              <Text style={screenStyles.actNo}>No</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalDeleteTr;
