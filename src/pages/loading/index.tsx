import React, {useEffect} from 'react';
import {Layout, Text, StyleService, Spinner} from '@ui-kitten/components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationStackParamList} from '../../navigation/navigationParams';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}

const Loading: React.FC<Props> = ({navigation}) => {
  // AsyncStorage.clear();
  useEffect(() => {
    AsyncStorage.getItem('access').then(access => {
      if (access) {
        AsyncStorage.getItem('user')
          .then(user => JSON.parse(user || '{}'))
          .then(user => {
            AsyncStorage.getItem('selected_family').then(SelectedFamily => {
              console.log('user, SelectedFamily', user, SelectedFamily);
              if (user.is_completed && SelectedFamily) {
                navigation.replace('Main');
              } else if (user.is_completed) {
                navigation.replace('SelectFamily');
              } else {
                navigation.replace('CompleteProfile');
              }
            });
          });
      } else {
        navigation.replace('Login');
      }
    });
  }, [navigation]);

  return (
    <Layout style={styles.container}>
      <Layout style={styles.containerInner}>
        <Text style={styles.hi}>Kindred</Text>
        <Text style={styles.title}>
          Please wait while we are loading your data!
        </Text>

        <Layout
          style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Spinner />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Loading;

const styles = StyleService.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#06514a',
    // $color-primary-500
    paddingTop: 150,
  },
  containerInner: {
    backgroundColor: 'white',
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 24,
  },
  form: {flex: 1, justifyContent: 'space-between'},
  title: {
    color: '#06514a',
    textAlign: 'center',
    marginTop: 10,
  },
  hi: {
    color: '#06514a',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 32,
  },
  text: {
    color: '#06514a',
    textAlign: 'center',
    marginTop: 10,
  },
});
