import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  CheckBox,
  Icon,
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
import {CommonModal} from '../../components';
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
            console.log('[ShoppingList]', data);
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
          })
          .catch(err => {
            console.log('err', err.response.data);
          });
      });
  };

  return (
    <>
      <CommonModal
        visible={visible}
        setVisible={setVisible}
        title={'Enter your Item'}
        description={"Please enter what you'd like to buy"}
        placeHolder="What to buy?"
        value={value}
        setValue={setValue}
        onOk={addShoppingItem}
        buttonText="Add to shop list"
      />
      {/* <Modal
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
      </Modal> */}
      <Layout style={styles.container}>
        <Layout style={styles.header}>
          <Text style={styles.headerText}> ShoppingList </Text>
        </Layout>

        <Input
          placeholder="Search Items"
          onChangeText={t => setFilterWord(t)}
          accessoryRight={props => <Icon {...props} name="search" />}
        />
        <FlatList
          data={shoppingItems
            .filter(item => !item.is_bought)
            .filter(item => item.name.includes(filterWord))}
          renderItem={({item}) => (
            <ShoppingItem toggleBought={toggleBought} data={item} />
          )}
        />
        <Text style={styles.headerText}> Bought Items: </Text>
        <FlatList
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
          <Text>
            Add item
            {/* <Icon name="add" /> */}
          </Text>
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
    padding: 15,
  },
  header: {
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e7f0ef',
    marginBottom: 10,
  },
  headerText: {
    alignSelf: 'center',
    padding: 15,
    color: '#06514a',
    fontWeight: 'bold',
    fontSize: 16,
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
