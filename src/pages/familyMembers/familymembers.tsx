import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Avatar, Button, Icon, Layout, Text} from '@ui-kitten/components';
import {FlatList, Pressable, StyleSheet, Share} from 'react-native';
import {NavigationStackParamList} from '../../navigation/navigationParams';

import {CommonModal, PopOver} from '../../components';
import {axios} from '../../utils';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}
const FamilyMembers: React.FC<Props> = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [familyData, setFamilyData] = useState({});
  const [phone, setPhone] = useState('+989910472916');

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
        });
    } catch (err) {
      console.log('err', err);
    }
  }, []);

  const invite = () => {
    AsyncStorage.getItem('selected_family')
      .then(data => JSON.parse(data || '{}'))
      .then(family => {
        axios
          .post(`/api/kindreds/${family.id}/invite/`, {
            phone_number: phone,
          })
          .then(({data}) => {
            console.log('data', data);
            Share.share({
              message: `You've invited to ${family.name}'s family in kindred app.
            download app and enter this code to join the family!\n ${data.invitation_code}`,
            });
            setModalVisible(false);
          });
      });
  };

  return (
    <Layout style={styles.page}>
      <Text style={styles.headerText}>{familyData.name}'s family members:</Text>
      <FlatList
        style={styles.flatList}
        data={familyMembers}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => (
          <FamilyItem
            image={item.user.image}
            name={`${item.user.first_name} ${item.user.last_name}`}
          />
        )}
      />
      <Button
        style={styles.btn}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text>Invite new member</Text>
      </Button>
      <Button
        style={styles.btn}
        onPress={() => {
          navigation.navigate('SelectFamily');
        }}>
        <Text>Choose another family!</Text>
      </Button>
      <CommonModal
        visible={modalVisible}
        setVisible={setModalVisible}
        value={phone}
        placeHolder="Phone number"
        setValue={setPhone}
        onOk={invite}
        buttonText={'Send invitation'}
        title="Invite new member"
        description={"Please enter new member's phone number"}
      />
    </Layout>
  );
};

const FamilyItem = ({
  image,
  name,
  isAdmin,
  onRemove = () => {},
  onChangeAdmin = () => {},
}) => {
  const [popOverVisible, setPopOverVisible] = useState(false);

  const renderPopOverToggleButton = () => {
    return (
      <Pressable
        onPress={() => {
          setPopOverVisible(true);
        }}>
        <Icon style={styles.icon} fill="#8F9BB3" name="arrow-down-outline" />
      </Pressable>
    );
  };

  return (
    <Layout style={styles.FamilyItem}>
      <Avatar source={{uri: image}} style={styles.avatar} />
      <Text style={styles.flex}>{name}</Text>
      <PopOver
        visible={popOverVisible}
        setVisible={setPopOverVisible}
        onRemove={() => {
          onRemove();
          setPopOverVisible(false);
        }}
        onUpgrade={() => {
          onChangeAdmin();
          setPopOverVisible(false);
        }}
        renderToggleButton={renderPopOverToggleButton}
      />
    </Layout>
  );
};
export default FamilyMembers;

const styles = StyleSheet.create({
  avatar: {
    marginRight: 10,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: 10,
    padding: 15,
  },
  FamilyItem: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#e7f0ef',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
  },
  btn: {
    width: '100%',
    maxWidth: 500,
    marginVertical: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  flatList: {
    width: '100%',
  },
  flex: {
    flex: 1,
  },
});
