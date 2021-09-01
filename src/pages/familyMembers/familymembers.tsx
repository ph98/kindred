import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Avatar, Button, Icon, Layout, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet} from 'react-native';
import {NavigationStackParamList} from '../../navigation/navigationParams';
import {axios} from '../../utils';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}
const FamilyMembers: React.FC<Props> = ({navigation}) => {
  const [familyMembers, setFamilyMembers] = useState([]);
  const [familyData, setFamilyData] = useState({});

  useEffect(() => {
    try {
      AsyncStorage.getItem('selected_family')
        .then(data => JSON.parse(data || '{}'))
        .then(kindred => {
          setFamilyData(kindred);
          // FamilyMembers
          // console.log('[user]', kindred);
          axios.get(`/api/kindreds/${kindred.id}/members/`).then(({data}) => {
            console.log('data', data);
            setFamilyMembers(data);
          });
          //  setFamilyMembers(kindred)
        });
    } catch (err) {
      console.log('err', err);
    }
    // console.log(`object`, object)
  }, []);
  return (
    <Layout style={styles.page}>
      <Text>{familyData.name}'s family members:</Text>
      <FlatList
        data={familyMembers}
        renderItem={({item}) => (
          <FamilyItem
            image={item.user.image}
            name={`${item.user.first_name} ${item.user.last_name}`}
          />
        )}
      />
      <Button
        onPress={() => {
          navigation.navigate('InviteMember');
        }}>
        <Text>ivnite new member</Text>
      </Button>
      <Button
        style={{margin: 10}}
        onPress={() => {
          navigation.navigate('SelectFamily');
        }}>
        <Text>Choose another family!</Text>
      </Button>
    </Layout>
  );
};

const FamilyItem = ({image, name, isAdmin, onDelete, onChangeAdmin}) => (
  <Layout style={styles.FamilyItem}>
    <Avatar source={{uri: image}} />
    <Text>{name}</Text>
    <Pressable style={styles.icon}>
      <Icon style={styles.icon} fill="#8F9BB3" name="arrow-down-outline" />
    </Pressable>
  </Layout>
);
export default FamilyMembers;

const styles = StyleSheet.create({
  page: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    flex: 1,
    paddingBottom: 10,
  },
  FamilyItem: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#e7f0ef',
    margin: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  icon: {
    backgroundColor: 'red',
    width: 32,
    height: 32,
  },
});
