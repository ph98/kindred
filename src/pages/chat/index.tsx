import React, {useState} from 'react';
import {Avatar, Input, Layout, Text} from '@ui-kitten/components';
import {StyleSheet, FlatList, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationStackParamList} from '../../navigation/navigationParams';
import {useEffect} from 'react';
import {axios} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
// import {w3cwebsocket as W3CWebSocket} from 'websocket';
import socketClusterClient from 'socketcluster-client';
import Toast from 'react-native-toast-message';
interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}

const socket = socketClusterClient.create({
  hostname: 'websocket.kindred.tempserver.ir',
  path: '/',
});

const Chat: React.FC<Props> = ({navigation}) => {
  const [chats, setChats] = useState([]);
  const [filterString, setFilterString] = useState('');
  useEffect(() => {
    // setInterval(() => {
    //   console.log('temp.', temp.isSubscribed());
    // }, 1000);
    console.log('chats', chats);
    (async () => {
      const userChannel = socket.subscribe('kindred-1');
      await userChannel.listener('subscribe').once();
      (async () => {
        // eslint-disable-next-line no-restricted-syntax
        const iterator = userChannel[Symbol.asyncIterator]();

        while (true) {
          const {value, done} = await iterator.next();
          if (done) {
            break;
          }
          const JSONvlaue = JSON.parse(value);
          console.log('value.action ', JSONvlaue.action);
          if (JSONvlaue.action === 'new_message') {
            // TODO: update data with new data
            console.log('[msg]', JSONvlaue.content);
            const temp = chats.map((item: any) =>
              item.kindred_member.id !== JSONvlaue.sent_from.user.id
                ? item
                : {
                    ...item,
                    message: {...item.message, content: JSONvlaue.content},
                  },
            );

            console.log('temp', temp);
            setChats(temp);
          }
        }
      })();
    })();

    AsyncStorage.getItem('selected_family')
      .then(data => JSON.parse(data || '{}'))
      .then(kindred => {
        axios
          .post('/api/messaging/chats-preview', {
            kindred: kindred.id,
          })
          .then(({data}) => {
            setChats(data);
          });
      });

    return () => {
      socket.closeAllListeners();
    };
  }, []);
  return (
    <Layout style={styles.container}>
      <Input placeholder="Search" onChangeText={t => setFilterString(t)} />
      <FlatList
        keyExtractor={item => item.kindred_member.id}
        renderItem={({item}) => (
          <ChatItem
            image={item.kindred_member.image}
            name={`${item.kindred_member.user.first_name} ${item.kindred_member.user.last_name}`}
            text={item.message?.content || ''}
            time={item.message ? item.message.created_at * 1000 || 0 : null}
            onPress={() => {
              navigation.navigate('ChatSingle', {user: item.kindred_member});
            }}
          />
        )}
        data={
          chats.length
            ? chats.filter(
                item =>
                  item.kindred_member.user.first_name
                    .toLowerCase()
                    .includes(filterString.toLowerCase()) ||
                  item.kindred_member.user.last_name
                    .toLowerCase()
                    .includes(filterString.toLowerCase()),
              )
            : []
        }
      />
    </Layout>
  );
};
// FamilyMembers
export default Chat;

const ChatItem = ({image, name, time, text, onPress}) => (
  <Pressable style={styles.chatItem} onPress={onPress}>
    <Avatar source={{uri: image}} />
    <Layout>
      <Text style={{fontWeight: 'bold'}}>{name}</Text>
      <Text>{text}</Text>
    </Layout>
    <Text>{time && dayjs(time).format('HH:mm')}</Text>
  </Pressable>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  chatItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#e7f0ef',
    borderBottomWidth: 1,
    margin: 10,
    padding: 10,
  },
});
