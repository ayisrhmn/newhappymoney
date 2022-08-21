import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@utils/index';

export const screenStyles = StyleSheet.create({
  container: {
    paddingHorizontal: Mixins.scaleSize(18),
  },
  row: {
    flexDirection: 'row',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Mixins.scaleSize(14),
    marginBottom: Mixins.scaleSize(8),
  },
  balanceLabel: {
    fontSize: Mixins.scaleFont(14),
    color: Colors.GREY,
    marginRight: Mixins.scaleSize(8),
  },
  balanceValue: {
    fontSize: Mixins.scaleFont(14),
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  title: {
    fontSize: Mixins.scaleFont(14),
    fontWeight: 'bold',
    color: Colors.BLACK,
  },
  card: {
    backgroundColor: Colors.WHITE,
    paddingHorizontal: Mixins.scaleSize(18),
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
  textFilter: {
    fontSize: Mixins.scaleFont(12),
    fontWeight: 'bold',
    color: Colors.GREY,
  },
});
