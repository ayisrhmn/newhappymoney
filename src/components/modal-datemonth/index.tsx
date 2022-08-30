import React from 'react';
import DatePicker from 'react-native-modern-datepicker';

import Modal from '@components/modal';
import {Colors, Helper, Mixins, Typography} from '@utils/index';

interface Props {
  visible: boolean;
  onClose: Function | any;
  value: any;
  onMonthYearChange: (selectedDate: any) => void;
}

const ModalDateMonth = (props: Props) => {
  const options = {
    textHeaderColor: Colors.BLACK,
    textHeaderFontSize: Mixins.scaleFont(16),
    textDefaultColor: Colors.BLACK,
    textFontSize: Mixins.scaleFont(14),
    textSecondaryColor: Colors.GREY,
    mainColor: Colors.PRIMARY,
    headerFont: Typography.FONT_FAMILY_REGULAR,
    defaultFont: Typography.FONT_FAMILY_REGULAR,
  };

  return (
    <Modal
      show={props?.visible}
      loading={false}
      showCloseButton={false}
      onClose={props?.onClose}
    >
      <DatePicker
        mode="monthYear"
        selectorStartingYear={2000}
        current={props?.value}
        maximumDate={Helper.currentWithLastdateCondition('filter')}
        options={options}
        onMonthYearChange={props?.onMonthYearChange}
      />
    </Modal>
  );
};

export default ModalDateMonth;
