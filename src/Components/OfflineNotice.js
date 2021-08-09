// import React, {PureComponent, useEffect, useState} from 'react';
// import {View, Text, Dimensions, StyleSheet} from 'react-native';
// import NetInfo from '@react-native-community/netinfo';

// const {width} = Dimensions.get('window');

// const [isConnected, setIsConnected] = useState(false);

// useEffect(() => {
//   NetInfo.addEventListener(handleConnectivityChange);
//   NetInfo.fetch().then((state) => {
//     setIsConnected(state.isConnected);
//   });

//   return () => {
//     NetInfo.addEventListener((state) => {
//       setIsConnected(state.isConnected);
//     });
//   };
// }, [NetInfo]);

// function handleConnectivityChange(state) {
//   if (state.isConnected) {
//     setIsConnected(true);
//   } else {
//     setIsConnected(false);
//   }
// }

// function MiniOfflineSign() {
//   return (
//     <View style={styles.offlineContainer}>
//       <Text style={styles.offlineText}>No Internet Connection</Text>
//     </View>
//   );
// }

// if (!isConnected) {
//   return (
//     <View style={{height: 30}}>
//       <MiniOfflineSign />
//     </View>
//   );
// }
// return null;

// const styles = StyleSheet.create({
//   offlineContainer: {
//     backgroundColor: '#b52424',
//     height: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'row',
//     width,
//     position: 'absolute',
//     bottom: 0,
//   },
//   offlineText: {color: '#fff'},
// });
