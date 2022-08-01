import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@utils/index';

export const screenStyles = StyleSheet.create({
  container: {
    paddingVertical: Mixins.scaleSize(10),
    paddingHorizontal: Mixins.scaleSize(18),
  },
  actions: {
    marginTop: Mixins.scaleSize(24),
  },
  linkWrapper: {
    marginVertical: Mixins.scaleSize(14),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {fontSize: Mixins.scaleFont(14)},
  textLink: {
    fontSize: Mixins.scaleFont(14),
    fontWeight: 'bold',
    color: Colors.PRIMARY,
  },
});
