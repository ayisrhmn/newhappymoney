import React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

import {Colors, Mixins, Typography} from '@utils/index';

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
      {['SignIn', 'SignUp', 'Home'].indexOf(route.name) < 0 && (
        <Appbar.BackAction
          onPress={() => {
            if (['SignIn', 'SignUp'].indexOf(route.name) < 0) {
              navigation.goBack();
            } else {
              navigation.navigate('GetStarted');
            }
          }}
          color={Colors.BLACK}
          size={Mixins.scaleFont(24)}
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
  },
  headerText: {
    fontSize: Mixins.scaleFont(18),
    fontFamily: Typography.FONT_FAMILY_BOLD,
    color: Colors.BLACK,
  },
});

export default Header;
