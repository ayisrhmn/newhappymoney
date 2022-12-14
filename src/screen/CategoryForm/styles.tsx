import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@utils/index';

export const screenStyles = StyleSheet.create({
  container: {
    paddingVertical: Mixins.scaleSize(10),
    paddingHorizontal: Mixins.scaleSize(18),
  },
  row: {
    flexDirection: 'row',
  },
  modalContainer: {
    padding: Mixins.scaleSize(16),
  },
  modalTitle: {
    fontSize: Mixins.scaleFont(16),
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  itemWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Mixins.scaleSize(8),
  },
  itemLabel: {
    fontSize: Mixins.scaleFont(14),
    color: Colors.BLACK,
  },
  headerRightWrap: {
    marginRight: Mixins.scaleSize(14),
  },
  headerRightAction: {
    fontSize: Mixins.scaleFont(14),
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  textRadio: {
    fontSize: Mixins.scaleFont(14),
    textAlignVertical: 'center',
    color: Colors.BLACK,
    marginRight: Mixins.scaleSize(24),
  },
  labelOnTr: {
    fontSize: Mixins.scaleFont(11),
    fontWeight: 'bold',
    color: Colors.DANGER,
  },
});
