import React, {useEffect, useState} from 'react';
import {Layout} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationStackParamList} from '../../navigation/navigationParams';
import MapView, {Marker} from 'react-native-maps';
import Geolocation, {GeoCoordinates} from 'react-native-geolocation-service';

interface Props extends NativeStackScreenProps<NavigationStackParamList> {
  state: any;
}
const Map: React.FC<Props> = ({navigation}) => {
  const [position, setposition] = useState<GeoCoordinates>({
    latitude: 36.306306306306304,
    longitude: 59.585824202127284,
    accuracy: 10,
    altitude: 10,
    heading: 10,
    speed: 10,
  });

  useEffect(() => {
    // Geolocation.requestAuthorization().then(data => {
    //   console.log('data', data);
    // });
    let geo = Geolocation.watchPosition(
      data => {
        console.log('data', data);
        setposition(data.coords);
      },
      e => {
        console.log('e', e);
      },
      {enableHighAccuracy: true},
    );

    return () => {
      Geolocation.clearWatch(geo);
    };
  }, []);
  return (
    <Layout style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        region={{
          latitude: position.latitude,
          longitude: position.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}>
        <Marker coordinate={position} />
      </MapView>
    </Layout>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  map: {flex: 1, width: '100%'},
});
