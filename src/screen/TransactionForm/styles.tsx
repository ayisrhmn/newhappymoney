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
  modalCategoryContainer: {
    paddingTop: Mixins.scaleSize(14),
    height: '85%',
  },
  modalTitleCategory: {
    fontSize: Mixins.scaleFont(16),
    fontWeight: 'bold',
    color: Colors.BLACK,
    paddingHorizontal: Mixins.scaleSize(14),
    marginBottom: Mixins.scaleSize(20),
  },
  typeCategory: {
    fontSize: Mixins.scaleFont(12),
    fontWeight: 'bold',
    paddingHorizontal: Mixins.scaleSize(14),
    marginBottom: Mixins.scaleSize(12),
  },
  rowCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Mixins.scaleSize(14),
    marginBottom: Mixins.scaleSize(16),
  },
  nameCategory: {
    fontSize: Mixins.scaleFont(14),
    color: Colors.BLACK,
  },
});
