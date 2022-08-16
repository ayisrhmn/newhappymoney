import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';

import Modal from '@components/modal';
import {Colors, Helper, Mixins} from '@utils/index';

import {screenStyles} from './styles';

import moment from 'moment';

interface Props {
  visible: boolean;
  onClose: Function | any;
  item: any;
  onPressEdit: Function | any;
  onPressDelete: Function | any;
}

const ModalDetail = (props: Props) => {
  return (
    <Modal
      show={props?.visible}
      showCloseButton={true}
      loading={false}
      onClose={props?.onClose}
    >
      <View style={screenStyles.modalContainer}>
        <Text style={{...screenStyles.modalTitle, fontWeight: 'bold'}}>
          Detail transaction
        </Text>
        <View
          style={[
            screenStyles.itemList,
            {
              paddingHorizontal: 0,
              marginBottom: 0,
              marginTop: Mixins.scaleSize(14),
            },
          ]}
        >
          <View style={screenStyles.trList}>
            <View>
              <Text style={screenStyles.categoryLabel}>
                {props?.item?.Title}
              </Text>
              <Text style={screenStyles.categoryTrLabel}>
                {props?.item?.Category?.Name}
              </Text>
              <Text style={screenStyles.trDateLabel}>
                {moment(props?.item?.TrDate).format('DD MMMM YYYY')}
              </Text>
            </View>
            <Text
              style={{
                ...screenStyles.amountTr,
                color:
                  props?.item?.Category?.Type === 'Income'
                    ? Colors.SUCCESS
                    : Colors.DANGER,
              }}
            >
              Rp {Helper.numberWithSeparator(props?.item?.Amount)}
            </Text>
          </View>
        </View>
        <View style={screenStyles.actions}>
          <View style={screenStyles.row}>
            <TouchableOpacity onPress={props?.onPressEdit}>
              <Text style={screenStyles.actEdit}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props?.onPressDelete}>
              <Text style={screenStyles.actDelete}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalDetail;
