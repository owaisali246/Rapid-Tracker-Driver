import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

var timer;

const App = () => {
  const [currentLongitude, setCurrentLongitude] = useState(0.0000);
  const [currentLatitude, setCurrentLatitude] = useState(0.0000);
  const [locationStatus, setLocationStatus] = useState('');

  useEffect(() => {
    setLocationStatus('You are Here');
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        // subscribeLocationLocation();
      }
      else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // console.log('permission given')
            getOneTimeLocation();
            // subscribeLocationLocation();
          } else {
            // console.log('permission denied')
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          // console.log('warning error')
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
  }, []);

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude.toFixed(5), position.coords.longitude.toFixed(5));
        setCurrentLongitude(position.coords.longitude.toFixed(5));
        setCurrentLatitude(position.coords.latitude.toFixed(5));
      },
      (error) => {
        setLocationStatus(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // const subscribeLocationLocation = () => {
  //   watchID = Geolocation.watchPosition(
  //     (position) => {
  //       setLocationStatus('You are Here');
  //       console.log(position.coords.latitude, position.coords.longitude);
  //       setCurrentLongitude(position.coords.longitude);
  //       setCurrentLatitude(position.coords.latitude);
  //     },
  //     (error) => {
  //       setLocationStatus(error.message);
  //     },
  //     { enableHighAccuracy: true, maximumAge: 1000, interval: 3000 }
  //   );
  // };



  function share_location() {
    timer = setInterval(getOneTimeLocation, 8000);
    setLocationStatus("Sharing Location...")
  }
  function stop_sharing_loc() {
    clearInterval(timer);
    setLocationStatus("Location Sharing Stopped!")
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Image
            source={{
              uri:
                // 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
                'https://github.com/owaisali246/Metro-Bus-Tracking-app/blob/main/src/Assets/newMarker.png?raw=true'
            }}
            style={{ width: 100, height: 100 }}
          />
          <Text style={styles.boldText}>{locationStatus}</Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              color: 'black',
              marginTop: 16,
              fontSize: 20
            }}>
            Longitude: {currentLongitude}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              color: 'black',
              marginTop: 16,
              fontSize: 20
            }}>
            Latitude: {currentLatitude}
          </Text>
          <View style={{ marginTop: 30 }}>
            <Button color='#03fe86' title="Start Location Sharing" onPress={share_location} />
          </View>
          <View style={{ marginTop: 30 }}>
            <Button color={'red'} title="Stop Location Sharing" onPress={stop_sharing_loc} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boldText: {
    fontSize: 26,
    color: '#03fe86',
    marginVertical: 16,
  },
});

export default App;
