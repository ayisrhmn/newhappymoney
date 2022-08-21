import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Header from '@components/header';

import Splash from '@screen/Splash';
import SignIn from '@screen/SignIn';
import SignUp from '@screen/SignUp';

import MainNav from '@navigations/main-navigation';

import CategoryForm from '@screen/CategoryForm';
import TransactionForm from '@screen/TransactionForm';
import Report from '@screen/Report';
import ReportTransactions from '@screen/ReportTransactions';

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
          name="MainNav"
          component={MainNav}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="CategoryForm" component={CategoryForm} />
        <Stack.Screen name="TransactionForm" component={TransactionForm} />
        <Stack.Screen
          name="Report"
          component={Report}
          options={{
            headerTitle: 'Report',
          }}
        />
        <Stack.Screen
          name="ReportTransactions"
          component={ReportTransactions}
          options={{
            headerTitle: 'Report Transactions',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
