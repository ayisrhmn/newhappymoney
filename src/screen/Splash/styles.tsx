import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@utils/index';

export const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: Mixins.scaleSize(126),
    height: Mixins.scaleSize(126),
    marginBottom: Mixins.scaleSize(16),
  },
  maintitle: {
    color: Colors.BLACK,
    fontWeight: 'bold',
    fontSize: Mixins.scaleFont(30),
    marginBottom: Mixins.scaleSize(6),
  },
  subtitle: {
    color: Colors.BLACK,
    fontSize: Mixins.scaleFont(14),
  },
});
