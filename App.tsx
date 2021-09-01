import 'react-native-gesture-handler';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {default as theme} from './src/config/custom-theme.json'; // <-- Import app theme
import React from 'react';
import {useColorScheme} from 'react-native';
import {AuthStack} from './src/navigation/auth';
import Toast from 'react-native-toast-message';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  console.log('isDarkMode', isDarkMode);
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />

      <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
        <AuthStack />
        <Toast ref={ref => Toast.setRef(ref)} />
      </ApplicationProvider>
    </>
  );
};

export default App;
