import React, {useState, useRef} from 'react';
import {
  Button,
  Input,
  Layout,
  Text,
  Datepicker,
  StyleService,
  Avatar,
  useStyleSheet,
} from '@ui-kitten/components';
import {Pressable, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationStackParamList} from '../../navigation/navigationParams';
import {axios} from '../../utils';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Asset} from 'react-native-image-picker';
import dayjs from 'dayjs';

import {Loading, ImagePickerModal} from '../../components';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}

const CompleteProfile: React.FC<Props> = ({navigation}) => {
  const styles = useStyleSheet(themedStyles);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<Asset | null>(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [date, setDate] = useState('');
  const refferences = useRef({
    lastName: '',
    date: '',
  });

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

    setLoading(true);
    axios
      .put('/api/users/complete-profile', ProfileData)
      .then(({data}) => {
        Toast.show({text1: data.message, type: 'success'});
        console.log('data', data);
        AsyncStorage.setItem('user', JSON.stringify(data.user)).then(() => {
          navigation.popToTop();
          navigation.replace('Loading');
        });
      })
      .catch(err => {
        console.log('err here', err.response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.containerInner}>
        <ScrollView contentContainerStyle={styles.scroll}>
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
              autoFocus
              returnKeyType="next"
              onSubmitEditing={() => refferences.current.lastName.focus()}
              style={styles.input}
              onChangeText={setFirstname}
              label={evaProps => <Text {...evaProps}>First Name</Text>}
            />
            <Input
              ref={ref => {
                refferences.current.lastName = ref;
              }}
              returnKeyType="next"
              style={styles.input}
              onChangeText={setLastname}
              label={evaProps => <Text {...evaProps}>Last Name</Text>}
            />
            <Datepicker
              style={styles.input}
              date={date}
              onSelect={nextDate => setDate(nextDate)}
              label={evaProps => <Text {...evaProps}>Birthday</Text>}
            />
            <Layout>
              <Button
                disabled={!firstname || !lastname || !date || !image || loading}
                style={styles.input}
                onPress={complete}>
                {loading ? (
                  <Loading />
                ) : (
                  <Text> Start track your family! </Text>
                )}
              </Button>
            </Layout>
          </Layout>
        </ScrollView>
      </Layout>
      <ImagePickerModal
        visible={visible}
        setVisible={setVisible}
        setImage={setImage}
      />
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
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: 'color-primary-500',
    paddingTop: 150,
    justifyContent: 'flex-end',
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
  input: {
    marginVertical: 10,
  },
  scroll: {
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  backDrop: {
    backgroundColor: 'grey',
    opacity: 0.9,
  },
});
