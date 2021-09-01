import React, {useEffect, useState} from 'react';
import {Button, Input, Layout, Modal, Text} from '@ui-kitten/components';
import {Alert, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationStackParamList} from '../../navigation/navigationParams';
import {axios} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}

const ShoppingList: React.FC<Props> = ({navigation}) => {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  useFocusEffect(() => {
    AsyncStorage.getItem('selected_family')
      .then(data => JSON.parse(data || '{}'))
      .then(family => {
        axios
          .get(`/api/kindreds/shopping-items?kindred=${family.id}`)
          .then(({data}) => {
            console.log('[ShoppingList]', data);
          });
      });
  });

  const addShoppingItem = () => {
    AsyncStorage.getItem('selected_family')
      .then(data => JSON.parse(data || '{}'))
      .then(kindred => {
        axios
          .post('/api/kindreds/shopping-items/', {
            kindred: kindred.id,
            name: value,
          })
          .then(({data}) => {
            console.log('data', data);
            Toast.show({text1: data.message});
            setVisible(false);
          })
          .catch(err => {
            console.log('err', err.response.data);
          });
      });
  };

  return (
    <>
      <Modal
        visible={visible}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onBackdropPress={() => setVisible(false)}
        style={styles.modalStyle}>
        <Text>Enter your Item</Text>
        <Input
          placeholder="what to buy?"
          onChangeText={t => setValue(t)}
          value={value}
        />
        <Button
          onPress={() => {
            addShoppingItem();
          }}>
          Add
        </Button>
      </Modal>
      <Layout style={styles.container}>
        <Text> ShoppingList </Text>

        <Button
          onPress={() => {
            setVisible(true);
          }}>
          <Text>Add item</Text>
        </Button>
      </Layout>
    </>
  );
};

export default ShoppingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  modalStyle: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    minHeight: 100,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
