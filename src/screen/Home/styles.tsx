import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@utils/index';

export const screenStyles = StyleSheet.create({
  container: {
    paddingHorizontal: Mixins.scaleSize(18),
  },
  balanceContainer: {
    marginTop: Mixins.scaleSize(14),
    marginBottom: Mixins.scaleSize(18),
  },
  balanceValue: {
    fontSize: Mixins.scaleFont(21),
    fontWeight: 'bold',
    marginBottom: Mixins.scaleSize(4),
    color: Colors.BLACK,
  },
  balanceLabel: {
    fontSize: Mixins.scaleFont(14),
    color: Colors.GREY,
  },

  sectionContainer: {
    marginBottom: Mixins.scaleSize(24),
  },
  rowTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Mixins.scaleSize(8),
  },
  title: {
    fontSize: Mixins.scaleFont(14),
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  titleLink: {
    fontSize: Mixins.scaleFont(14),
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
  card: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Mixins.scaleSize(12),
    borderRadius: Mixins.scaleSize(4),
  },
  spendingAmount: {
    fontSize: Mixins.scaleFont(16),
    fontWeight: 'bold',
    marginBottom: Mixins.scaleSize(4),
  },
  amountLabel: {
    fontSize: Mixins.scaleFont(10),
    color: Colors.BLACK,
  },
  amountWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Mixins.scaleSize(16),
  },
  progressWrapper: {
    marginBottom: Mixins.scaleSize(30),
  },
  itemList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Mixins.scaleSize(16),
  },
  rowCategory: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryContent: {
    marginLeft: Mixins.scaleSize(10),
  },
  categoryLabel: {
    fontSize: Mixins.scaleFont(14),
    color: Colors.BLACK,
    marginBottom: Mixins.scaleSize(4),
  },
  amountTopLabel: {
    fontSize: Mixins.scaleFont(12),
    color: Colors.PRIMARY,
  },
  percentTopLabel: {
    fontSize: Mixins.scaleFont(14),
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  topWrapper: {
    marginBottom: Mixins.scaleSize(14),
  },

  titleReached: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Mixins.scaleSize(12),
    marginBottom: Mixins.scaleSize(14),
  },
  listReached: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Mixins.scaleSize(12),
  },
  amountReached: {
    fontSize: Mixins.scaleFont(14),
    fontWeight: 'bold',
    textAlignVertical: 'center',
    color: Colors.DANGER,
  },

  recentTr: {
    marginTop: Mixins.scaleSize(16),
    marginBottom: Mixins.scaleSize(6),
  },
  trList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Mixins.scaleSize(16),
  },
  categoryTrLabel: {
    fontSize: Mixins.scaleFont(12),
    marginBottom: Mixins.scaleSize(4),
    color: Colors.PRIMARY,
  },
  amountTr: {
    fontSize: Mixins.scaleFont(14),
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
  trDateLabel: {
    fontSize: Mixins.scaleFont(12),
    color: Colors.GREY,
  },

  noDataWrapper: {
    paddingVertical: Mixins.scaleSize(34),
  },
  noDataText: {
    fontSize: Mixins.scaleFont(14),
    textAlign: 'center',
    color: Colors.BLACK,
  },

  row: {
    flexDirection: 'row',
  },
  modalContainer: {
    padding: Mixins.scaleSize(16),
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
  sizeCheckbox: {
    transform: [
      {scaleX: Mixins.scaleSize(0.74)},
      {scaleY: Mixins.scaleSize(0.74)},
    ],
  },
  checkboxText: {
    fontSize: Mixins.scaleFont(12),
    color: Colors.BLACK,
    marginLeft: Mixins.scaleSize(-3),
  },
});
