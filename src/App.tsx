/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {Provider as StoreProvider} from 'overmind-react';
import {Provider as PaperProvider, DefaultTheme} from 'react-native-paper';
import {store} from '@overmind/index';

import {Colors, Mixins, Typography} from '@utils/index';
import StackNavigation from '@navigations/stack-navigation';

import moment from 'moment';
import 'moment/locale/en-gb';

const App = () => {
  const theme: any = {
    ...DefaultTheme,
    roundness: Mixins.scaleSize(10),
    colors: {
      ...DefaultTheme.colors,
      primary: Colors.PRIMARY,
    },
    fonts: {
      ...DefaultTheme.fonts,
      regular: {
        fontFamily: Typography.FONT_FAMILY_REGULAR,
        fontWeight: 'normal',
      },
    },
  };

  moment.locale('en');
  Typography.typography();

  return (
    <StoreProvider value={store}>
      <PaperProvider theme={theme}>
        <StackNavigation />
      </PaperProvider>
    </StoreProvider>
  );
};

export default App;
