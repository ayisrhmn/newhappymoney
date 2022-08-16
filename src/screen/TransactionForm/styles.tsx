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
  modalTitleCategory: {
    fontSize: Mixins.scaleFont(16),
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginBottom: Mixins.scaleSize(20),
  },
  typeCategory: {
    fontSize: Mixins.scaleFont(12),
    fontWeight: 'bold',
    marginBottom: Mixins.scaleSize(8),
  },
  rowCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Mixins.scaleSize(6),
  },
  nameCategory: {
    fontSize: Mixins.scaleFont(14),
    color: Colors.BLACK,
  },
});
