// DEPRECATED AND UNUSED
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Input, Layout, Text, Button} from '@ui-kitten/components';
import React, {useState} from 'react';
import {Share} from 'react-native';
import {axios} from '../../utils';

const InviteMember = ({navigation}) => {
  const [phone, setPhone] = useState('+989910472916');
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
              message: `You are invited to ${family.name}'s family in kindred app.
download app and enter this code to join the family!\n ${data.invitation_code}`,
            });
            // navigation.pop();
          });
      });
  };
  return (
    <Layout>
      <Text>InviteMember</Text>
      <Input value={phone} onChangeText={t => setPhone(t)} />
      <Button onPress={invite}>
        <Text>Invite!</Text>
      </Button>
    </Layout>
  );
};

export default InviteMember;
