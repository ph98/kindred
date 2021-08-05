import 'react-native-gesture-handler';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';

import React from 'react';
import {useColorScheme} from 'react-native';
import {AuthStack} from './src/navigation/auth';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <ApplicationProvider {...eva} theme={isDarkMode ? eva.dark : eva.light}>
      <AuthStack />
    </ApplicationProvider>
  );
};

export default App;
