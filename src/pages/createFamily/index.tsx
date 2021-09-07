import React, {useState} from 'react';
import {
  Input,
  Layout,
  StyleService,
  Text,
  Button,
  Avatar,
} from '@ui-kitten/components';
import {Pressable, ScrollView} from 'react-native';
import {Asset} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';

import {Loading, ImagePickerModal} from '../../components';
import {axios} from '../../utils';

const CreateFamily = ({navigation}) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState<Asset | null>(null);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = () => {
    const ProfileData = new FormData();
    ProfileData.append('name', name);
    ProfileData.append('image', {
      uri: image?.uri,
      name: image?.fileName,
      type: image?.type,
    });

    setLoading(true);
    axios
      .post('/api/kindreds/', ProfileData)
      .then(({data}) => {
        console.log(data);
        Toast.show({text1: data.message, type: 'success'});
        navigation.pop();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.containerInner}>
        <Text style={styles.hi}>Kindred</Text>
        <Text style={styles.title}>Please tell us about your family</Text>
        <Layout style={styles.inner}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <Pressable
              onPress={() => {
                setVisible(true);
              }}>
              <Avatar
                style={styles.avatar}
                source={image || require('../../assets/icon_add.png')}
              />
            </Pressable>
            <Input
              autoFocus
              style={styles.input}
              placeholder="What we should call your family?"
              value={name}
              onChangeText={(nextValue: string) => setName(nextValue)}
            />
            <Button
              disabled={!name || !image || loading}
              style={styles.modalButtonItem}
              onPress={submit}>
              {loading ? <Loading /> : <Text>Submit!</Text>}
            </Button>
          </ScrollView>
          <ImagePickerModal
            visible={visible}
            setVisible={setVisible}
            setImage={setImage}
          />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CreateFamily;

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
  scroll: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  input: {
    marginVertical: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    margin: 10,
  },
});
