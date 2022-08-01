import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Header from '@components/header';

import Splash from '@screen/Splash';
import SignIn from '@screen/SignIn';
import SignUp from '@screen/SignUp';
import Home from '@screen/Home';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          header: props => <Header {...props} />,
        }}
      >
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerTitle: 'Sign in',
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerTitle: 'Sign up',
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: 'Home',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
