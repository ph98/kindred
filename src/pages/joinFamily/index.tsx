import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input, Layout, StyleService, Text, Button} from '@ui-kitten/components';
import React from 'react';
import {useState} from 'react';
// import { Image } from 'react-native-svg';
import Toast from 'react-native-toast-message';

import {axios} from '../../utils';
import {Loading} from '../../components';

const JoinFamily = ({navigation}) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = () => {
    setLoading(true);
    AsyncStorage.getItem('user')
      .then(user => JSON.parse(user || '{}'))
      .then(user => {
        const data = {
          phone_number: user.phone_number,
          invitation_code: code,
        };

        axios.post('/api/kindreds/confirm-invite/', data).then(({data}) => {
          console.log(data);
          Toast.show({text1: data.message, type: 'success'});
          navigation.pop();
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.containerInner}>
        <Text style={styles.hi}>Kindred</Text>
        <Text style={styles.title}>Please Enter your invitation code</Text>

        <Layout style={styles.inner}>
          <Input
            autoFocus
            style={styles.input}
            placeholder="Your invite code"
            value={code}
            onChangeText={(nextValue: string) => setCode(nextValue)}
            onSubmitEditing={submit}
          />
          <Button
            disabled={!code || loading}
            style={styles.modalButtonItem}
            onPress={() => submit()}>
            {loading ? <Loading/> : <Text>Join!</Text>}
          </Button>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default JoinFamily;

const styles = StyleService.create({
  modalButtonItem: {
    marginBottom: 10,
    width: '100%',
    maxWidth: 500,
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
  input: {
    marginVertical: 10,
  },
});
