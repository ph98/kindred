import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationStackParamList} from '../../navigation/navigationParams';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}

const ShoppingList: React.FC<Props> = ({navigation}) => {
  return (
    <Layout style={styles.container}>
      <Text> ShoppingList </Text>
    </Layout>
  );
};

export default ShoppingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
