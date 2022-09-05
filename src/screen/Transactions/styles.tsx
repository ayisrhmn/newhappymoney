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
  headerFilter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Mixins.scaleSize(18),
    marginBottom: Mixins.scaleSize(8),
  },
  textFilter: {
    fontSize: Mixins.scaleFont(12),
    fontWeight: 'bold',
    color: Colors.GREY,
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
    marginBottom: Mixins.scaleSize(100),
  },
  itemList: {
    paddingVertical: Mixins.scaleSize(8),
    paddingHorizontal: Mixins.scaleSize(18),
  },
  noDataWrapper: {
    paddingVertical: Mixins.scaleSize(34),
  },
  noDataText: {
    fontSize: Mixins.scaleFont(14),
    textAlign: 'center',
    color: Colors.BLACK,
  },
  trList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryLabel: {
    fontSize: Mixins.scaleFont(14),
    color: Colors.BLACK,
    marginBottom: Mixins.scaleSize(4),
  },
  categoryTrLabel: {
    fontSize: Mixins.scaleFont(12),
    marginBottom: Mixins.scaleSize(4),
    color: Colors.PRIMARY,
  },
  trDateLabel: {
    fontSize: Mixins.scaleFont(12),
    color: Colors.GREY,
  },
  amountTr: {
    fontSize: Mixins.scaleFont(14),
    marginBottom: Mixins.scaleSize(4),
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  modalContainer: {
    padding: Mixins.scaleSize(16),
  },
  filterTitle: {
    fontSize: Mixins.scaleFont(16),
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  resetFilter: {
    fontSize: Mixins.scaleFont(14),
    fontWeight: 'bold',
    color: Colors.DANGER,
  },
  modalContent: {
    marginTop: Mixins.scaleSize(20),
  },
  modalSection: {
    marginBottom: Mixins.scaleSize(14),
  },
  modalSectionTitle: {
    fontSize: Mixins.scaleFont(14),
    fontWeight: 'bold',
    color: Colors.BLACK,
    marginBottom: Mixins.scaleSize(6),
  },
  btnFilter: {
    paddingVertical: Mixins.scaleSize(4),
    paddingHorizontal: Mixins.scaleSize(6),
    borderWidth: Mixins.scaleSize(1),
    borderColor: Colors.PRIMARY,
    borderRadius: Mixins.scaleSize(4),
    marginRight: Mixins.scaleSize(6),
    marginBottom: Mixins.scaleSize(6),
  },
  btnFilterSelected: {
    backgroundColor: Colors.PRIMARY,
  },
  txtFilter: {
    fontSize: Mixins.scaleFont(14),
    color: Colors.PRIMARY,
  },
  actions: {
    alignItems: 'flex-end',
    marginTop: Mixins.scaleSize(32),
  },
  actEdit: {
    fontSize: Mixins.scaleFont(14),
    fontWeight: 'bold',
    color: Colors.PRIMARY,
    marginRight: Mixins.scaleSize(14),
  },
  actDelete: {
    fontSize: Mixins.scaleFont(14),
    fontWeight: 'bold',
    color: Colors.DANGER,
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
    color: Colors.GREY,
  },
  modalTitle: {
    fontSize: Mixins.scaleFont(14),
    color: Colors.BLACK,
    width: '90%',
  },
  modalTrTitle: {
    fontSize: Mixins.scaleFont(15),
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  textNote: {
    fontSize: Mixins.scaleFont(12),
    color: Colors.BLACK,
  },
});
