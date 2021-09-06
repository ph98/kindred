import React, {useState} from 'react';
import {Avatar, Input, Layout, Button, Text, Icon} from '@ui-kitten/components';
import {StyleSheet, FlatList, Pressable, Linking} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationStackParamList} from '../../navigation/navigationParams';
import {useEffect} from 'react';
import {axios} from '../../utils';
import dayjs from 'dayjs';
import socketClusterClient from 'socketcluster-client';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}

const ChatSingle: React.FC<Props> = ({navigation, route}) => {
  const [chats, setChats] = useState({});
  const [message, setMessage] = useState('salam');
  const [btnLoading, setBtnLoading] = useState(false);
  const {user} = route.params;
  const {id} = user;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const retriveMessages = () => {
    axios
      .post('/api/messaging/chat-messages', {
        kindred_member: id,
      })
      .then(({data}) => {
        setChats(data);
        // console.log('[messages data]', data);
      });
  };
  useEffect(() => {
    async () => {
      const ws = socketClusterClient.create({
        hostname: 'wss://websocket.kindred.tempserver.ir',
      });
      console.log('done1');
      const wsChannel = ws.channel('kindred-1');
      wsChannel.subscribe();
      await wsChannel.listener('subscribe').once();

      (async () => {
        // eslint-disable-next-line no-restricted-syntax
        for await (const data of wsChannel) {
          console.log('[socket]', data);
          // socketcluster.consumeWorkspaceData(data);
        }
      })();
    };
    retriveMessages();
  }, [id, retriveMessages]);

  const sendMessage = () => {
    setBtnLoading(true);
    axios
      .post('/api/messaging/send-message', {
        content: message,
        sent_to: id,
      })
      .then(({data}) => {
        console.log('[sent message]', data);
        setMessage('');
        retriveMessages();
      })
      .finally(() => {
        setBtnLoading(false);
      });
  };
  return (
    <Layout style={{flexDirection: 'column', flex: 1}}>
      <Layout
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
        }}>
        <Pressable
          onPress={() => {
            navigation.pop();
          }}>
          <Icon style={styles.icon} fill="#8F9BB3" name="arrow-left-outline" />
        </Pressable>
        <Text style={{fontWeight: 'bold'}}>
          {`${user.user.first_name} ${user.user.last_name}`}{' '}
        </Text>
        <Pressable
          onPress={() => {
            Linking.openURL(`tel:${user.user.phone_number}`);
          }}>
          <Icon style={styles.icon} fill="#8F9BB3" name="phone" />
        </Pressable>
      </Layout>
      <FlatList
        inverted
        data={chats.results}
        style={{flex: 1}}
        renderItem={({item}) => (
          <Layout style={{margin: 10}}>
            <Layout>
              <Layout style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    backgroundColor: item.sent_from_me ? '#008ac6' : '#8f9bb3',
                    padding: 10,
                  }}>
                  {item.content}
                </Text>
              </Layout>
              <Text>{dayjs(item.created_at * 1000).format('HH:mm')}</Text>
            </Layout>
          </Layout>
        )}
      />
      <Layout style={styles.footer}>
        <Input
          value={message}
          style={{flex: 1}}
          onChangeText={t => setMessage(t)}
        />
        <Button
          disabled={btnLoading}
          style={{position: 'absolute', right: 0}}
          onPress={() => sendMessage()}>
          <Text>send!</Text>
        </Button>
      </Layout>
    </Layout>
  );
};
// FamilyMembers
export default ChatSingle;

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderTopWidth: 1,
  },
  inputContainer: {
    marginHorizontal: 10,
  },
  icon: {
    width: 32,
    height: 32,
    fontSize: 24,
  },
});
