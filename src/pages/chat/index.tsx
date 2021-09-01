import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {StyleSheet, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationStackParamList} from '../../navigation/navigationParams';
import {useEffect, useState} from 'react';
import {axios} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}

const Chat: React.FC<Props> = ({navigation}) => {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem('selected_family')
      .then(kindred => JSON.parse(kindred || '{}'))
      .then(kindred => {
        console.log('kindred', kindred);
        axios
          .post('/api/messaging/chats-preview', {kindred: kindred.id})
          .then(({data}) => {
            console.log('data', data);
            setUserList(data);
          })
          .finally(() => {
            setLoading(false);
          });
      });
  }, []);
  return (
    <Layout style={styles.container}>
      <Text> Chat </Text>
      <FlatList
        data={userList}
        renderItem={({item}) => <Text>{JSON.stringify(item)}</Text>}
      />
    </Layout>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
