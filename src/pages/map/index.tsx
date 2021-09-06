import React, {useCallback, useEffect, useState} from 'react';
import {Avatar, Layout} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationStackParamList} from '../../navigation/navigationParams';
import MapView, {Marker} from 'react-native-maps';
import Geolocation, {GeoCoordinates} from 'react-native-geolocation-service';
import {Header} from '../../components/header/header';
import {axios} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}
const Map: React.FC<Props> = ({navigation}) => {
  const [familyMembersLocations, setfamilyMembersLocations] = useState([]);
  const [position, setposition] = useState<GeoCoordinates>({
    latitude: 36.306306306306304,
    longitude: 59.585824202127284,
    accuracy: 10,
    altitude: 10,
    heading: 10,
    speed: 10,
  });
  useFocusEffect(
    useCallback(() => {
      console.log('object');
      AsyncStorage.getItem('selected_family')
        .then(selected => JSON.parse(selected || '{}'))
        .then(selected => {
          axios
            .post('/api/kindreds/locations/last-locations/', {
              kindred: selected.id,
            })
            .then(({data}) => {
              console.log('data', data);
              setfamilyMembersLocations(data);
            });

          // axios.get(`/api/kindreds/${selected.id}/members/`)
        });
    }, []),
  );
  useEffect(() => {
    // Geolocation.requestAuthorization().then(data => {
    //   console.log('data', data);
    // });
    let geo = Geolocation.watchPosition(
      data => {
        console.log('[location]', data);
        setposition(data.coords);

        axios
          .post('/api/kindreds/locations/', {
            coordinate: `${data.coords.latitude} ${data.coords.longitude}`,
          })
          .then(({data}) => {
            console.log('data1', data);
          })
          .catch(err => {
            console.log('err', err.response.data);
          });
      },
      e => {
        console.log('e', e);
      },
      {
        enableHighAccuracy: true,
        showsBackgroundLocationIndicator: true,
        showLocationDialog: true,
      },
    );

    return () => {
      Geolocation.clearWatch(geo);
    };
  }, []);
  return (
    <Layout style={styles.container}>
      <Header />
      <MapView
        style={styles.map}
        showsUserLocation={false}
        region={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        {familyMembersLocations.map(item => {
          return (
            <CustomMarker
              coords={{
                latitude: Number(item.coordinate.split(' ')[0]),
                longitude: Number(item.coordinate.split(' ')[1]),
              }}
              image={item.user.image}
              name={`${item.user.first_name} ${item.user.last_name}`}
              key={item.user.first_name}
            />
          );
        })}
        {/* <Marker coordinate={position} /> */}
      </MapView>
    </Layout>
  );
};

export default Map;

const CustomMarker = ({name, image, coords}) => {
  // const [showtooltip, setShowtooltip] = useState(true);
  return (
    <Marker
      title={name}
      coordinate={coords}
      // onPress={() => setShowtooltip(!showtooltip)}
    >
      {image && <Avatar source={{uri: image}} />}
    </Marker>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  map: {flex: 1, width: '100%'},
});
