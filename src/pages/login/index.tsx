import React from 'react';
import {Button, Input, Layout, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationStackParamList} from '../../navigation/navigationParams';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}

const LoginPage: React.FC<Props> = ({navigation}) => {
  return (
    <Layout style={styles.container}>
      <Input
        // textStyle={{ ... }}
        label={evaProps => <Text {...evaProps}>Label</Text>}
        caption={evaProps => <Text {...evaProps}>Caption</Text>}
      />
      <Button
        onPress={() => {
          navigation.navigate('Main');
        }}>
        <Text> Login </Text>
      </Button>
    </Layout>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
