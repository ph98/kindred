import AsyncStorage from '@react-native-async-storage/async-storage';
import {Avatar, Layout, StyleService, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {Pressable, FlatList} from 'react-native';
import {axios} from '../../utils';
// import {  } from 'react-native-gesture-handler';

export const SelectFamily = ({navigation}) => {
  const [userData, setUser] = useState({});
  useEffect(() => {
    axios.get('/api/users/profile').then(({data}) => {
      console.log('data1', data);
      setUser(data);
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
          <FlatList
            style={{width: '100%'}}
            data={userData.kindreds}
            renderItem={({item}) => (
              <Pressable
                onPress={() => {
                  AsyncStorage.setItem(
                    'selected_family',
                    JSON.stringify(item),
                  ).then(() => {
                    navigation.navigate('Main');
                  });
                }}
                style={styles.KindredItems}>
                <Avatar source={{uri: item.image}} />
                <Text>{item.name}</Text>
              </Pressable>
            )}
          />
          <Pressable
            style={styles.buttonStyle}
            onPress={() => {
              navigation.navigate('Main', {screen: 'CreateFamily'});
            }}>
            <Text style={styles.buttonTitle}>Submit a family</Text>
            <Text style={styles.buttonDescription}>
              If your family is new to kindred!
            </Text>
          </Pressable>
          <Pressable
            style={styles.buttonStyle}
            onPress={() => {
              navigation.navigate('Main', {screen: 'JoinFamily'});
            }}>
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
  KindredItems: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    // width: '100%',
    padding: 10,
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
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
