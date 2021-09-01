import React from 'react';
import {BottomTabBarOptions} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
import Map from '../pages/map';
import ShoppingList from '../pages/shoppingList';
import Chat from '../pages/chat';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationStackParamList} from './navigationParams';
import ProfilePage from '../pages/profile/profile';
import CreateFamily from '../pages/createFamily';
import JoinFamily from '../pages/joinFamily';
import FamilyMembers from '../pages/familyMembers/familymembers';
import InviteMember from '../pages/inviteMember';
import ChatSingle from '../pages/chatSingle';
const {Navigator, Screen} = createBottomTabNavigator();
const Stack = createNativeStackNavigator<NavigationStackParamList>();

interface Props extends BottomTabBarProps<BottomTabBarOptions> {
  state: any;
}

const BottomTabBar: React.FC<Props> = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="Map" />
    <BottomNavigationTab title="ShoppingList" />
    <BottomNavigationTab title="Chat" />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={(props: any) => <BottomTabBar {...props} />}>
    <Screen name="Map" component={Map} />
    <Screen name="ShoppingList" component={ShoppingList} />
    <Screen name="Chat" component={Chat} />
  </Navigator>
);

const MainNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Tabs" component={TabNavigator} />
      <Stack.Screen name="Profile" component={ProfilePage} />
      <Stack.Screen name="JoinFamily" component={JoinFamily} />
      <Stack.Screen name="CreateFamily" component={CreateFamily} />
      <Stack.Screen name="FamilyMembers" component={FamilyMembers} />
      <Stack.Screen name="InviteMember" component={InviteMember} />
      <Stack.Screen name="ChatSingle" component={ChatSingle} />
      {/* ChatSingle */}
    </Stack.Navigator>
  );
};

export default MainNavigation;
