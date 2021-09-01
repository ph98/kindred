import React, {useState} from 'react';
import {Avatar, Input, Layout, Button, Text, Icon} from '@ui-kitten/components';
import {StyleSheet, FlatList, Pressable, Linking} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationStackParamList} from '../../navigation/navigationParams';
import {useEffect} from 'react';
import {axios} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}

const ChatSingle: React.FC<Props> = ({navigation, route}) => {
  const [chats, setChats] = useState({});
  const [message, setMessage] = useState('salam');
  const [btnLoading, setBtnLoading] = useState(false);
  const {user} = route.params;
  const {id} = user;
  console.log('user', user);
  const retriveMessages = () => {
    axios
      .post('/api/messaging/chat-messages', {
        kindred_member: id,
      })
      .then(({data}) => {
        setChats(data);
        console.log('[data]', data);
      });
  };
  useEffect(() => {
    retriveMessages();
  }, [id]);

  const sendMessage = () => {
    setBtnLoading(true);
    axios
      .post('/api/messaging/send-message', {
        content: message,
        sent_to: id,
      })
      .then(({data}) => {
        console.log('data', data);
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
              {console.log(item)}
              <Text
                style={{
                  backgroundColor: item.sent_from_me ? '#008ac6' : '#8f9bb3',
                  padding: 10,
                  width: 'auto',
                }}>
                {item.content}
              </Text>
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
