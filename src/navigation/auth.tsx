import React from 'react';
import LoginPage from '../pages/login';
import MainNavigation from './main';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OtpPage from '../pages/otp';
type RootStackParamList = {
  Login: {};
  Main: {};
  Otp: {};
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Otp" component={OtpPage} />
        <Stack.Screen name="Main" component={MainNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
