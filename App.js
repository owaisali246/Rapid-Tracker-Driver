// import React, { useState, useRef, useEffect } from 'react';
// import { StyleSheet, Text, View, PermissionsAndroid, Platform } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
// import Geolocation from 'react-native-geolocation-service'



// const api_key = 'AIzaSyBLQSJcaTQHHsQ8N6k1takZ-WbvtiW3s98'
// // 24.9498, 67.04557

// const getLocationCoords = () => new Promise((resolve, reject) => {

//   Geolocation.watchPosition(position => {
//     const coords = {
//       latitude: position.coords.latitude,
//       longitude: position.coords.longitude,
//     };
//     resolve(coords);
//   },
//     error => {
//       reject(error.message);
//     },

//     { enableHighAccuracy: true, timeout: 1500, maximumAge: 1000 },
//   ).catch((error) => {
//     console.log(error);
//   })
// });

// const locationPermission = () => new Promise(async (resolve, reject) => {
//   if (Platform.OS === 'ios') {
//     try {
//       const permissionStatus = await Geolocation.requestAuthorization('whenInUse');
//       if (permissionStatus === 'granted') {
//         console.log("permission granted")
//         return resolve('granted')
//       }
//       reject('permission not granted')
//     } catch (error) {
//       return reject(error)
//     }
//   }
//   else {

//     return PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       console.log('got here 1')
//     ).then((status) => {
//       console.log('got here too')
//       if (status == PermissionsAndroid.RESULTS.GRANTED) {
//         console.log(status, '+++')
//         resolve('granted');
//       }
//       return reject('Location Permission denied');
//     }).catch((error) => {
//       console.log('Ask location permission error: ', error);
//       return reject(error);
//     });
//   }
// });

// export default function App() {

//   useEffect(() => {
//     getCurrentLocation();
//     // Geolocation.getCurrentPosition((position) => {
//     //   console.log(position)
//     // })
//   })

//   const getCurrentLocation = async () => {
//     const locPermissionStatus = await locationPermission()
//     console.log('working..', locPermissionStatus)
//     if (locPermissionStatus) {
//       console.log('got here')

//       const { result } = await getLocationCoords()
//       console.log('res==>>>', result)
//     }
//   }

//   const [State, setState] = useState({
//     pickupCoords: {
//       latitude: 24.9498, longitude: 67.04557
//     },
//     destinationCoords: {
//       latitude: 24.95448, longitude: 67.0574
//     }
//   })

//   const mapRef = useRef();

//   return (
//     <View style={styles.container}>
//       <MapView style={StyleSheet.absoluteFillObject}
//         ref={mapRef}
//         region={{
//           latitude: State.pickupCoords.latitude,
//           longitude: State.pickupCoords.longitude,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         }}

//       >
//         <Marker
//           coordinate={State.pickupCoords}
//         />
//         <Marker
//           coordinate={State.destinationCoords}
//         />

//         <MapViewDirections
//           origin={State.pickupCoords}
//           destination={State.destinationCoords}
//           apikey={api_key}
//           strokeWidth={3}
//           strokeColor="blue"
//           optimizeWaypoints={true}
//           onReady={result => {
//             mapRef.current.fitToCoordinates(result.coordinates, {
//               edgePadding: {
//                 top: 100,
//                 bottom: 150,
//                 right: 30,
//                 left: 30
//               }
//             })
//           }}
//         />

//       </MapView>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//   },
// });






























// React Native Geolocation
// https://aboutreact.com/react-native-geolocation/

// import React in our code
import React, { useState, useEffect } from 'react';

// import all the components we are going to use
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

//import all the components we are going to use.
import Geolocation from 'react-native-geolocation-service';
// Geolocation.setRNConfiguration(config);

const App = () => {
  const [currentLongitude, setCurrentLongitude] = useState(0.0000);
  const [currentLatitude, setCurrentLatitude] = useState(0.0000);
  const [locationStatus, setLocationStatus] = useState('');

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        // getOneTimeLocation();
        subscribeLocationLocation();
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
            //To Check, If Permission is granted
            // getOneTimeLocation();
            console.log('permission given')
            subscribeLocationLocation();
          } else {
            console.log('permission denied')
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.log('warning error')
          console.warn(err);
        }
      }
    };
    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  }, []);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');
        console.log(position.coords)
        const currentLongitude = position.coords.longitude;
        //getting the Longitude from the location
        const currentLatitude = position.coords.latitude;
        //getting the Latitude from the location
        setCurrentLongitude(currentLongitude);
        //Setting state Longitude to re re-render the Longitude Text
        setCurrentLatitude(currentLatitude);
        //Setting state Latitude to re re-render the Longitude Text
      },
      (error) => {
        setLocationStatus(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 300 }
    );
  };

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        setLocationStatus('You are Here');
        //Will give you the location on location change
        console.log(position.coords);
        const currentLongitude = (position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = (position.coords.latitude);
        //getting the Latitude from the location json
        setCurrentLongitude(currentLongitude);
        //Setting state Longitude to re re-render the Longitude Text
        setCurrentLatitude(currentLatitude);
        //Setting state Latitude to re re-render the Longitude Text
      },
      (error) => {
        setLocationStatus(error.message);
      },
      { enableHighAccuracy: true, maximumAge: 1000, interval: 3000 }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.container}>
          <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/location.png',
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
            }}>
            Longitude: {currentLongitude}
          </Text>
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              color: 'black',
              marginTop: 16,
            }}>
            Latitude: {currentLatitude}
          </Text>
          <View style={{ marginTop: 20 }}>
            <Button title="Button" onPress={getOneTimeLocation} />
          </View>
        </View>
        <Text style={{ fontSize: 18, textAlign: 'center', color: 'grey' }}>
          React Native Geolocation
        </Text>
        <Text style={{ fontSize: 16, textAlign: 'center', color: 'grey' }}>
          www.aboutreact.com
        </Text>
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
    fontSize: 25,
    color: 'red',
    marginVertical: 16,
  },
});

export default App;


















// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  * @flow strict-local
//  */

// import React from 'react';
// import type {Node} from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// const Section = ({children, title}): Node => {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// };

// const App: () => Node = () => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
//       <ScrollView
//         contentInsetAdjustmentBehavior="automatic"
//         style={backgroundStyle}>
//         <Header />
//         <View
//           style={{
//             backgroundColor: isDarkMode ? Colors.black : Colors.white,
//           }}>
//           <Section title="Step One">
//             Edit <Text style={styles.highlight}>App.js</Text> to change this
//             screen and then come back to see your edits.
//           </Section>
//           <Section title="See Your Changes">
//             <ReloadInstructions />
//           </Section>
//           <Section title="Debug">
//             <DebugInstructions />
//           </Section>
//           <Section title="Learn More">
//             Read the docs to discover what to do next:
//           </Section>
//           <LearnMoreLinks />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;
