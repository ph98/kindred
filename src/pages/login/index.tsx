import React, {useState} from 'react';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationStackParamList} from '../../navigation/navigationParams';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}

const LoginPage: React.FC<Props> = ({navigation}) => {
  const [phone, setphone] = useState('');
  const login = () => {
    console.log('phone', phone);
    navigation.navigate('Main');
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#049b8a',
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
