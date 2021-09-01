import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Avatar, Button, Input, Layout, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {NavigationStackParamList} from '../../navigation/navigationParams';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}
const ProfilePage: React.FC<Props> = ({navigation}) => {
  const [userData, setUserData] = useState({});
  const [name, setName] = useState({});
  const [lastname, setLastname] = useState({});
  useEffect(() => {
    try {
      AsyncStorage.getItem('user')
        .then(data => JSON.parse(data || '{}'))
        .then(user => {
          console.log('[user]', user);
          setUserData(user);
          setName(user.first_name);
          setLastname(user.last_name);
        });
    } catch (err) {
      console.log('err', err);
    }
    // console.log(`object`, object)
  }, []);
  return (
    <Layout
      style={{
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
      }}>
      {/* <Text>{userData.image}</Text> */}
      <Avatar
        source={{uri: userData.image}}
        style={{width: 100, height: 100}}
      />
      <Input value={name} onChangeText={t => setName(t)} />
      <Input value={lastname} onChangeText={t => setLastname(t)} />
      <Input value={userData.phone_number} disabled />

      <Button>
        <Text>Edit</Text>
      </Button>

      <Button
        style={{backgroundColor: 'red'}}
        onPress={() => {
          AsyncStorage.clear();
          navigation.popToTop();
          navigation.replace('Login');
        }}>
        <Text>Logout</Text>
      </Button>
    </Layout>
  );
};

export default ProfilePage;
