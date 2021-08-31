import AsyncStorage from '@react-native-async-storage/async-storage';
import {Layout, StyleService, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {Pressable} from 'react-native';

export const SelectFamily = () => {
  const [userData, setUser] = useState({});
  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(user => JSON.parse(user || '{}'))
      .then(user => {
        console.log('user', user);
        setUser(user);
      });
  }, []);
  return (
    <Layout style={styles.container}>
      <Layout style={styles.containerInner}>
        <Text style={styles.hi}>Kindred</Text>
        <Text style={styles.title}>Please select</Text>

        <Layout style={styles.inner}>
          {/* {
                userData.kindreds.map
            }
             */}
          <Pressable style={styles.buttonStyle}>
            <Text style={styles.buttonTitle}>Submit a family</Text>
            <Text style={styles.buttonDescription}>
              If your family is new to kindred!
            </Text>
          </Pressable>
          <Pressable style={styles.buttonStyle}>
            <Text style={styles.buttonTitle}>Join a family</Text>
            <Text style={styles.buttonDescription}>
              If your family exists in kindred!
            </Text>
          </Pressable>
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleService.create({
  buttonDescription: {},
  buttonTitle: {
    fontWeight: 'bold',
  },
  buttonStyle: {
    borderWidth: 2,
    width: '100%',
    textAlign: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
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
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#06514a',
    textAlign: 'center',
    marginTop: 10,
  },
});
