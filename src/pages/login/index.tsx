import React, {useState} from 'react';
import {Button, Input, Layout, Text, StyleService} from '@ui-kitten/components';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationStackParamList} from '../../navigation/navigationParams';
import {axios} from '../../utils';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}

const LoginPage: React.FC<Props> = ({navigation}) => {
  const [phone, setphone] = useState('+989910472915');
  const login = () => {
    // axios.post('/api/users/sign-up', {phone_number: phone}).then(({data}) => {
    //   console.log('data', data);
    navigation.navigate('Otp');
    // });
  };
  return (
    <Layout style={styles.container}>
      <Layout style={styles.containerInner}>
        <Text style={styles.title}>Kindred</Text>
        <Text style={styles.hi}>Hi!</Text>
        <Text style={styles.text}>
          Welcome to Kindred! for start using the app please login into you'r
          account
        </Text>

        <View style={styles.form}>
          <Input
            // textStyle={{ ... }}
            keyboardType="number-pad"
            value={phone}
            onChangeText={setphone}
            label={evaProps => <Text {...evaProps}>Phone number</Text>}
          />
          <View>
            <Button
              onPress={() => {
                login();
              }}>
              <Text> Login / Sign up </Text>
            </Button>
          </View>
        </View>
      </Layout>
    </Layout>
  );
};

export default LoginPage;

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
