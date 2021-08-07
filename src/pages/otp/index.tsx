import React, {useState} from 'react';
import {Button, Input, Layout, Text, StyleService} from '@ui-kitten/components';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationStackParamList} from '../../navigation/navigationParams';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}

const OtpPage: React.FC<Props> = ({navigation}) => {
  const [otp, setotp] = useState('');
  const verify = () => {
    navigation.navigate('Main');
  };
  return (
    <Layout style={styles.container}>
      <Layout style={styles.containerInner}>
        <Text style={styles.title}>Kindred</Text>
        <Text style={styles.hi}>Please enter your OTP</Text>

        <View style={styles.form}>
          <Input
            // textStyle={{ ... }}
            keyboardType="number-pad"
            onChangeText={setotp}
            label={evaProps => (
              <Text {...evaProps}>Enter your verification code</Text>
            )}
          />
          <View>
            <Button
              onPress={() => {
                verify();
              }}>
              <Text> Verify! </Text>
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
