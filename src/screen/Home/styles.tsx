import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@utils/index';

export const screenStyles = StyleSheet.create({
  container: {
    paddingHorizontal: Mixins.scaleSize(18),
  },
  balanceWrapper: {
    marginTop: Mixins.scaleSize(14),
  },
  balanceValue: {
    fontSize: Mixins.scaleFont(21),
    fontWeight: 'bold',
    marginBottom: Mixins.scaleSize(3),
    color: Colors.BLACK,
  },
  balanceLabel: {
    fontSize: Mixins.scaleFont(14),
    color: Colors.GREY,
  },
  loadingWrapper: {
    marginVertical: Mixins.scaleSize(24),
  },
});
