import React, {useState} from 'react';
import {
  Button,
  Input,
  Layout,
  Text,
  Datepicker,
  StyleService,
  Avatar,
  useStyleSheet,
  Card,
  Modal,
} from '@ui-kitten/components';
import {Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationStackParamList} from '../../navigation/navigationParams';
import {axios} from '../../utils';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
  ImagePickerResponse,
} from 'react-native-image-picker';
import dayjs from 'dayjs';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}

const CompleteProfile: React.FC<Props> = ({navigation}) => {
  const styles = useStyleSheet(themedStyles);
  const [visible, setVisible] = useState(false);
  // ImagePickerResponse
  const [image, setImage] = useState<Asset | null>(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [date, setDate] = useState('');
  const complete = () => {
    const ProfileData = new FormData();
    ProfileData.append('first_name', firstname);
    ProfileData.append('last_name', lastname);
    console.log('date', date);
    ProfileData.append('date_of_birth', dayjs(date).format('YYYY-MM-DD'));
    ProfileData.append('image', {
      uri: image?.uri,
      name: image?.fileName,
      type: image?.type,
    });
    axios
      .put('/api/users/complete-profile', ProfileData)
      .then(({data}) => {
        Toast.show({text1: data.message, type: 'success'});
        console.log('data', data);
        AsyncStorage.setItem('user', JSON.stringify(data.user)).then(() => {
          navigation.replace('Main');
        });
      })
      .catch(err => {
        console.log('err here', err.response);
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
        <Text style={styles.title}>Please complete your profile!</Text>
        <Layout style={styles.form}>
          <Layout style={styles.imageContainer}>
            <Pressable
              onPress={() => {
                setVisible(true);
              }}>
              <Avatar
                style={styles.avatar}
                source={image || require('../../assets/icon_add.png')}
              />
            </Pressable>
          </Layout>
          <Input
            onChangeText={setFirstname}
            label={evaProps => <Text {...evaProps}>First Name</Text>}
          />
          <Input
            onChangeText={setLastname}
            label={evaProps => <Text {...evaProps}>Last Name</Text>}
          />
          <Datepicker
            date={date}
            onSelect={nextDate => setDate(nextDate)}
            label={evaProps => <Text {...evaProps}>Birthday</Text>}
          />
          <Layout>
            <Button
              onPress={() => {
                complete();
              }}>
              <Text> Start track your family! </Text>
            </Button>
          </Layout>
        </Layout>
      </Layout>
      <Modal visible={visible} onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
          <Button
            style={styles.modalButtonItem}
            onPress={() => launchCamera({mediaType: 'photo'}, handleImagePick)}>
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
  );
};

export default CompleteProfile;

const themedStyles = StyleService.create({
  modalButtonItem: {marginBottom: 10},
  imageContainer: {
    paddingTop: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'color-primary-500',
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
    color: 'color-primary-500',
    textAlign: 'center',
    marginTop: 10,
  },
  hi: {
    color: 'color-primary-500',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 32,
  },
  text: {
    color: 'color-primary-500',
    textAlign: 'center',
    marginTop: 10,
  },
});
