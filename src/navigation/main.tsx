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
const {Navigator, Screen} = createBottomTabNavigator();

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
  return <TabNavigator />;
};

export default MainNavigation;
