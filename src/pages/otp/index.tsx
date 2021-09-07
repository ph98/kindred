import React, {useState} from 'react';
import {Button, Input, Layout, Text, StyleService} from '@ui-kitten/components';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationStackParamList} from '../../navigation/navigationParams';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {axios} from '../../utils';
import {Loading} from '../../components';
interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}

const OtpPage: React.FC<Props> = ({navigation, route}) => {
  const [otp, setotp] = useState('');
  const [loading, setLoading] = useState(false);

  const verify = () => {
    const {phone} = route.params;

    setLoading(true);
    axios
      .post('/api/users/confirm-signup', {phone_number: phone, otp})
      .then(({data}) => {
        Toast.show({text1: data.message, type: 'success'});
        console.log('data', data);
        AsyncStorage.setItem('refresh', JSON.stringify(data.tokens.refresh));
        AsyncStorage.setItem('user', JSON.stringify(data.user));
        AsyncStorage.setItem('access', JSON.stringify(data.tokens.access)).then(
          () => {
            navigation.popToTop();
            navigation.replace('Loading');
          },
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout style={styles.container}>
      <Layout style={styles.containerInner}>
        <Text style={styles.title}>Kindred</Text>
        <Text style={styles.hi}>Please enter your OTP</Text>
        <View style={styles.form}>
          <Input
            autoFocus
            onSubmitEditing={verify}
            keyboardType="number-pad"
            onChangeText={setotp}
            label={evaProps => (
              <Text {...evaProps}>Enter your verification code</Text>
            )}
          />
          <View>
            <Button disabled={!otp || loading} onPress={verify}>
              {loading ? <Loading /> : <Text> Verify! </Text>}
            </Button>
          </View>
        </View>
      </Layout>
    </Layout>
  );
};

export default OtpPage;

const styles = StyleService.create({
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
  text: {
    color: '#06514a',
    textAlign: 'center',
    marginTop: 10,
  },
});
