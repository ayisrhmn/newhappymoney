import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';

import Modal from '@components/modal';
import IconCategory from '@components/icon-category';
import {Colors, Helper, Mixins} from '@utils/index';

import {screenStyles} from './styles';

interface Props {
  visible: boolean;
  loading: boolean;
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
      loading={props?.loading}
      onClose={props?.onClose}
    >
      <View style={screenStyles.modalContainer}>
        <Text style={{...screenStyles.modalTitle, fontWeight: 'bold'}}>
          {props?.item?.Type} category
        </Text>
        <View
          style={[
            screenStyles.row,
            {alignItems: 'center', marginTop: Mixins.scaleSize(20)},
          ]}
        >
          <View style={screenStyles.iconWrap}>
            <IconCategory
              backgroundColor={
                props?.item?.Type === 'Income' ? Colors.SUCCESS : Colors.DANGER
              }
            />
          </View>
          <View>
            <Text style={screenStyles.category}>{props?.item?.Name}</Text>
            {props?.item?.Type === 'Expense' && (
              <Text style={screenStyles.limit}>
                {props?.item?.Limit === 0
                  ? 'No limit'
                  : `Limit: Rp ${Helper.numberWithSeparator(
                      props?.item?.Limit,
                    )}`}
              </Text>
            )}
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
