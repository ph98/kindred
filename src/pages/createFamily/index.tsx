import {
  Input,
  Layout,
  StyleService,
  Text,
  Modal,
  Card,
  Button,
  Avatar,
} from '@ui-kitten/components';
import React from 'react';
import {useState} from 'react';
import {Image, Pressable} from 'react-native';
// import { Image } from 'react-native-svg';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {axios} from '../../utils';
const CreateFamily = ({navigation}) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState();
  const [visible, setVisible] = useState(false);
  const submit = () => {
    const ProfileData = new FormData();
    ProfileData.append('name', name);
    ProfileData.append('image', {
      uri: image?.uri,
      name: image?.fileName,
      type: image?.type,
    });
    axios.post('/api/kindreds/', ProfileData).then(({data}) => {
      console.log(data);
      Toast.show({text1: data.message, type: 'success'});
      navigation.pop();
    });
  };
  const handleImagePick = (data: ImagePickerResponse) => {
    if (data && data.assets?.length) {
      setImage(data.assets[0]);
      setVisible(false);
    }
  };
  return (
    <Layout style={styles.container}>
      <Layout style={styles.containerInner}>
        <Text style={styles.hi}>Kindred</Text>
        <Text style={styles.title}>Please tell us about your family</Text>

        <Layout style={styles.inner}>
          {/* {
              userData.kindreds.map
          }
           */}
          <Pressable
            // style={{wid}}
            onPress={() => {
              setVisible(true);
            }}>
            <Avatar
              style={{width: 100, height: 100, margin: 10}}
              source={image || require('../../assets/icon_add.png')}
            />
          </Pressable>
          <Input
            placeholder="What we should call your family?"
            value={name}
            onChangeText={(nextValue: string) => setName(nextValue)}
          />
          <Button style={styles.modalButtonItem} onPress={() => submit()}>
            Submit!
          </Button>
          <Modal visible={visible} onBackdropPress={() => setVisible(false)}>
            <Card disabled={true}>
              <Button
                style={styles.modalButtonItem}
                onPress={() =>
                  launchCamera({mediaType: 'photo'}, handleImagePick)
                }>
                Use your camera
              </Button>
              <Button
                style={styles.modalButtonItem}
                onPress={() =>
                  launchImageLibrary({mediaType: 'photo'}, handleImagePick)
                }>
                Use your Gallery
              </Button>
              <Button
                style={styles.modalButtonItem}
                onPress={() => setVisible(false)}>
                Cancel
              </Button>
            </Card>
          </Modal>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default CreateFamily;

const styles = StyleService.create({
  modalButtonItem: {marginBottom: 10},
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
