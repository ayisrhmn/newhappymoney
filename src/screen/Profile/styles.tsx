import {StyleSheet} from 'react-native';
import {Colors, Mixins} from '@utils/index';

export const screenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: Mixins.scaleSize(26),
    backgroundColor: Colors.WHITE,
  },
  loadingWrapper: {
    marginVertical: Mixins.scaleSize(12),
  },
  username: {
    fontSize: Mixins.scaleFont(16),
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginTop: Mixins.scaleSize(8),
    marginBottom: Mixins.scaleSize(3),
    color: Colors.BLACK,
  },
  email: {
    fontSize: Mixins.scaleFont(14),
    color: Colors.BLACK,
  },
  actions: {
    marginTop: Mixins.scaleSize(32),
    paddingHorizontal: Mixins.scaleSize(18),
  },
  versionContent: {
    flex: 1,
    marginTop: Mixins.scaleSize(32),
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: Mixins.scaleSize(36),
  },
  versionText: {
    fontSize: Mixins.scaleFont(12),
    fontWeight: 'bold',
    color: Colors.GREY,
  },
  followUs: {
    width: Mixins.scaleSize(70),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Mixins.scaleSize(12),
  },
});
