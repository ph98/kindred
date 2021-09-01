import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Avatar,
  Button,
  Input,
  Layout,
  StyleService,
  Text,
} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {NavigationStackParamList} from '../../navigation/navigationParams';
import {ScrollView} from 'react-native';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}

const Header = ({navigation}) => {
  return (
    <Layout style={[styles.headerWrapper, styles.fullWidth]}>
      <Text>Profile</Text>
      <Text onPress={() => navigation.pop()} style={styles.back}>
        back icon
      </Text>
    </Layout>
  );
};

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
    <Layout style={[styles.container, styles.fullWidth]}>
      <Header navigation={navigation} />
      <ScrollView
        style={styles.fullWidth}
        contentContainerStyle={styles.scroll}>
        <Avatar source={{uri: userData.image}} style={styles.avatar} />
        <Layout style={[styles.layout, styles.fullWidth]}>
          <Input
            style={styles.input}
            label="First name"
            value={name}
            onChangeText={t => setName(t)}
          />
          <Input
            style={styles.input}
            label="Last name"
            value={lastname}
            onChangeText={t => setLastname(t)}
          />
          <Input
            style={styles.input}
            label="Phone number"
            value={userData.phone_number}
            disabled
          />
        </Layout>
        <Layout style={[styles.layout, styles.fullWidth]}>
          {/* <Button appearance="outline" style={styles.input}>
            <Text>Edit password</Text>
          </Button> */}
          <Button
            style={styles.input}
            appearance="outline"
            status="danger"
            onPress={() => {
              AsyncStorage.clear();
              navigation.popToTop();
              navigation.replace('Login');
            }}>
            <Text>Logout</Text>
          </Button>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

export default ProfilePage;
const styles = StyleService.create({
  container: {
    flexGrow: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
    borderBottomColor: '#e7f0ef',
    borderBottomWidth: 1,
  },
  input: {
    marginVertical: 10,
  },
  layout: {
    padding: 15,
  },
  scroll: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  fullWidth: {
    width: '100%',
  },
  back: {
    position: 'absolute',
    left: 20,
  },
});
