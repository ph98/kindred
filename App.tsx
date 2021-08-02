import 'react-native-gesture-handler';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {NavigationContainer} from '@react-navigation/native';
import * as eva from '@eva-design/eva';
import {
  createBottomTabNavigator,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {
  ApplicationProvider,
  BottomNavigation,
  BottomNavigationTab,
  Text,
} from '@ui-kitten/components';

import React from 'react';
import {useColorScheme} from 'react-native';
import {BottomTabBarOptions} from '@react-navigation/bottom-tabs/lib/typescript/src/types';

const {Navigator, Screen} = createBottomTabNavigator();

interface Props extends BottomTabBarProps<BottomTabBarOptions> {
  state: any;
}

const BottomTabBar: React.FC<Props> = ({navigation, state}) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab title="USERS" />
    <BottomNavigationTab title="ORDERS" />
  </BottomNavigation>
);

const TabNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen name="Users" component={() => <Text>UsersScreen</Text>} />
    <Screen name="Orders" component={() => <Text>OrdersScreen</Text>} />
  </Navigator>
);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ApplicationProvider>
  );
};

export default App;
