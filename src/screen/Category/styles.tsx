import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@utils/index';

export const screenStyles = StyleSheet.create({
  container: {
    marginTop: Mixins.scaleSize(14),
  },
  row: {
    flexDirection: 'row',
  },
  headerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Mixins.scaleSize(18),
    marginBottom: Mixins.scaleSize(16),
  },
  mainTitle: {
    fontSize: Mixins.scaleFont(16),
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  linkTitle: {
    fontSize: Mixins.scaleFont(14),
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  listSection: {
    backgroundColor: Colors.WHITE,
    paddingVertical: Mixins.scaleSize(14),
    paddingHorizontal: Mixins.scaleSize(18),
  },
  typeTitle: {
    fontSize: Mixins.scaleFont(14),
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginBottom: Mixins.scaleSize(16),
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Mixins.scaleSize(16),
  },
  iconWrap: {
    marginRight: Mixins.scaleSize(10),
  },
  category: {
    fontSize: Mixins.scaleFont(14),
    color: Colors.BLACK,
  },
  limit: {
    fontSize: Mixins.scaleFont(12),
    color: Colors.PRIMARY,
    marginTop: Mixins.scaleSize(4),
  },
  modalContainer: {
    padding: Mixins.scaleSize(16),
  },
  modalTitle: {
    fontSize: Mixins.scaleFont(14),
    color: Colors.BLACK,
  },
  modalCtTitle: {
    fontSize: Mixins.scaleFont(16),
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  actions: {
    alignItems: 'flex-end',
    marginTop: Mixins.scaleSize(32),
  },
  actYes: {
    fontSize: Mixins.scaleFont(14),
    fontWeight: 'bold',
    color: Colors.DANGER,
    marginRight: Mixins.scaleSize(14),
  },
  actNo: {
    fontSize: Mixins.scaleFont(14),
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  noDataWrapper: {
    paddingVertical: Mixins.scaleSize(16),
  },
  noDataText: {
    fontSize: Mixins.scaleFont(14),
    textAlign: 'center',
    color: Colors.BLACK,
  },
});
