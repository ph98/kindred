import React from 'react';
import LoginPage from '../pages/login';
import MainNavigation from './main';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OtpPage from '../pages/otp';
import CompleteProfile from '../pages/completeProfile';
import {NavigationStackParamList} from './navigationParams';
import Loading from '../pages/loading';
import {SelectFamily} from '../pages/selectFamily';
const Stack = createNativeStackNavigator<NavigationStackParamList>();

export const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Loading" component={Loading} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Otp" component={OtpPage} />
        <Stack.Screen name="CompleteProfile" component={CompleteProfile} />
        <Stack.Screen name="Main" component={MainNavigation} />
        <Stack.Screen name="SelectFamily" component={SelectFamily} />
        {/* SelectFamily */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
