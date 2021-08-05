import React from 'react';
import LoginPage from '../pages/login';
import MainNavigation from './main';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
type RootStackParamList = {
  Login: {};
  Main: {};
};
const Stack = createNativeStackNavigator<RootStackParamList>();

export const AuthStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Main" component={MainNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
