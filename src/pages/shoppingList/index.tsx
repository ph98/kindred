import React, {useCallback, useState} from 'react';
import {
  Button,
  CheckBox,
  Input,
  Layout,
  Modal,
  Text,
} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationStackParamList} from '../../navigation/navigationParams';
import {axios} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {FlatList} from 'react-native-gesture-handler';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}

const ShoppingList: React.FC<Props> = ({navigation}) => {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const [shoppingItems, setShoppingItems] = useState([]);
  const [filterWord, setFilterWord] = useState('');
  const getItems = () => {
    AsyncStorage.getItem('selected_family')
      .then(data => JSON.parse(data || '{}'))
      .then(family => {
        axios
          .get(`/api/kindreds/shopping-items?kindred=${family.id}`)
          .then(({data}) => {
            setShoppingItems(data);
          });
      });
  };
  useFocusEffect(
    useCallback(() => {
      getItems();
    }, []),
  );
  const toggleBought = (id, bought) => {
    console.log('id', id, bought);
    AsyncStorage.getItem('selected_family')
      .then(data => JSON.parse(data || '{}'))
      .then(family => {
        axios
          .patch(`/api/kindreds/shopping-items/${id}/`, {
            kindred: family.id,
            is_bought: bought,
          })
          .then(({data}) => {
            console.log('[data]', data);
            getItems();
            // setShoppingItems(data);
          });
      });
  };
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
            getItems();
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
          // value={value}
        />
        <Button
          onPress={() => {
            addShoppingItem();
          }}>
          Add
        </Button>
      </Modal>
      <Layout style={styles.container}>
        <Input
          placeholder="Search Items"
          onChangeText={t => setFilterWord(t)}
        />
        <FlatList
          ListHeaderComponent={
            <Layout
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                padding: 10,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                Buy List
              </Text>
            </Layout>
          }
          data={shoppingItems
            .filter(item => !item.is_bought)
            .filter(item => item.name.includes(filterWord))}
          renderItem={({item}) => (
            <ShoppingItem toggleBought={toggleBought} data={item} />
          )}
        />
        <FlatList
          ListHeaderComponent={
            <Layout
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                flexDirection: 'row',
                padding: 10,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                }}>
                Bought Items:
              </Text>
            </Layout>
          }
          data={shoppingItems
            .filter(item => item.is_bought)
            .filter(item => item.name.includes(filterWord))}
          renderItem={({item}) => (
            <ShoppingItem toggleBought={toggleBought} data={item} />
          )}
        />
        <Button
          style={{position: 'absolute', bottom: 10, right: '30%', width: '40%'}}
          onPress={() => {
            setVisible(true);
          }}>
          <Text>Add item</Text>
        </Button>
      </Layout>
    </>
  );
};
const ShoppingItem = ({data, toggleBought}) => (
  <Layout
    style={{
      // backgroundColor: 'red',
      borderBottomWidth: 1,
      borderColor: '#e7f0ef',
      margin: 10,
      flexDirection: 'row',
      alignItems: 'center',
    }}>
    <CheckBox
      style={{margin: 10}}
      checked={data.is_bought}
      onChange={value => toggleBought(data.id, value)}
    />
    <Text>{data.name}</Text>
    {/* <Text>{data.name}</Text> */}
  </Layout>
);
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
