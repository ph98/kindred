import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Layout, Text} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {NavigationStackParamList} from '../../navigation/navigationParams';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}
const ProfilePage: React.FC<Props> = () => {
  useEffect(() => {
    // console.log(`object`, object)
  }, []);
  return (
    <Layout>
      <Text>salam</Text>
    </Layout>
  );
};

export default ProfilePage;
