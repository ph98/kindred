import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Avatar, Layout} from '@ui-kitten/components';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {Alert, Pressable, Text} from 'react-native';

export const Header = () => {
  const [user, setUser] = useState({image: ''});
  const navigation = useNavigation();
  useEffect(() => {
    AsyncStorage.getItem('user').then(data => {
      setUser(JSON.parse(data || ''));
    });
  }, []);
  return (
    <Layout
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
      }}>
      <Pressable
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <Avatar source={{uri: user.image}} />
      </Pressable>
      <Text> Kindred</Text>
      <Pressable
        onPress={() => {
          navigation.navigate('FamilyMembers');
        }}>
        <Text> Family</Text>
      </Pressable>
    </Layout>
  );
};
