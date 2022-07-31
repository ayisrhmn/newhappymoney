import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

import {Colors, Mixins} from '@utils/index';

interface Props {
  navigation?: any;
  route?: any;
  options?: any;
}

const Header = (props: Props) => {
  const {navigation, route, options} = props;

  var title = options.headerTitle;
  if (title === undefined) {
    title = route.name;
  }

  const [right, setRight] = React.useState(null);
  const [left, setLeft] = React.useState(null);

  React.useLayoutEffect(() => {
    if (options.headerRight) {
      setRight(options.headerRight);
    }

    if (options.headerLeft) {
      setLeft(options.headerLeft);
    }

    return () => {
      setRight(null);
      setLeft(null);
    };
  }, [options]);

  return (
    <Appbar.Header style={styles.headerContainer}>
      {['Home'].indexOf(route.name) < 0 && (
        <Appbar.BackAction
          onPress={() => {
            if (['SignIn', 'SignUp'].indexOf(route.name) < 0) {
              navigation.goBack();
            } else {
              navigation.navigate('GetStarted');
            }
          }}
          color={Colors.PRIMARY}
          size={Mixins.scaleFont(28)}
        />
      )}
      {left}
      <Appbar.Content title={title} titleStyle={styles.headerText} />
      {right}
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.WHITE,
    height: Mixins.scaleSize(52),
  },
  headerText: {
    fontSize: Mixins.scaleFont(20),
    color: Colors.TEXT.primary,
    marginLeft: Mixins.scaleSize(-10),
  },
});

export default Header;
