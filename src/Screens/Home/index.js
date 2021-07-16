import * as React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  Animated,
  StyleSheet,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import NfcProxy from '../../NfcProxy';
import {Button, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';

const {width, height} = Dimensions.get('screen');

const bgs = ['#5A49F8', '#6C07EB', '#7C06ED', '#4B1AFC'];

const DATA = [
  {
    key: '3571572',
    title: 'Step 1 : Locate the Chip',
    description:
      'To see where the chip is located, refer to the information provided by the seller. Place yout phone in front of the scanning area.',
    image: 'https://image.flaticon.com/icons/png/512/3712/3712265.png',
  },
  {
    key: '3571747',
    title: 'Automated radical data-warehouse',
    description:
      'Use the optical SAS system, then you can navigate the auxiliary alarm!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571747.png',
  },
  {
    key: '3571680',
    title: 'Inverse attitude-oriented system engine',
    description:
      'The ADP array is down, compress the online sensor so we can input the HTTP panel!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571680.png',
  },
  {
    key: '3571603',
    title: 'Monitored global data-warehouse',
    description: 'We need to program the open-source IB interface!',
    image: 'https://image.flaticon.com/icons/png/256/3571/3571603.png',
  },
];

const Backdrop = ({scrollX}) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: bgs.map((_, i) => i * width),
    outputRange: bgs.map((bg) => bg),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          backgroundColor,
        },
      ]}
    />
  );
};

const Indicator = ({scrollX}) => {
  return (
    <View style={{position: 'absolute', bottom: 100, flexDirection: 'row'}}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.6, 0.9, 0.6],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={`indicator-${i}`}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: 'white',
              opacity,
              margin: 10,
              transform: [
                {
                  scale,
                },
              ],
            }}
          />
        );
      })}
    </View>
  );
};

const Square = ({scrollX}) => {
  const YOLO = Animated.modulo(
    Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
    1,
  );

  const rotate = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['35deg', '-35deg', '35deg'],
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });

  return (
    <Animated.View
      style={{
        width: height,
        height: height,
        backgroundColor: 'white',
        borderRadius: 200,
        position: 'absolute',
        top: -height * 0.6,
        transform: [
          {
            rotate,
          },
          {
            translateX,
          },
        ],
      }}
    />
  );
};

function HomeScreen(props) {
  const {navigation} = props;
  const [supported, setSupported] = React.useState(null);
  const [enabled, setEnabled] = React.useState(null);
  const scrollX = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    async function initNfc() {
      try {
        setSupported(await NfcProxy.init());
        setEnabled(await NfcProxy.isEnabled());
      } catch (ex) {
        Alert.alert('ERROR', 'fail to init NFC', [{text: 'OK'}]);
      }
    }
    initNfc();
  });

  function renderNfcButtons() {
    return (
      <View
        style={{
          alignItems: 'stretch',
          alignSelf: 'center',
        }}>
        <Button
          mode="contained"
          style={{
            marginTop: 10,
            marginBottom: 10,
            padding: 10,
            borderRadius: 50,
            backgroundColor: 'white',
          }}
          onPress={async () => {
            const tag = await NfcProxy.readTag();
            if (tag) {
              console.log('Homepage tag', tag.id);

              database()
                .ref('/Artworks/' + tag.id)
                .on('value', (snapshot) => {
                  //console.log('User data: ', snapshot.val());
                  const dataGet = snapshot.val();
                  //console.log('Data from Firebase : ', dataGet);
                  if (dataGet != undefined) {
                    navigation.navigate('TagDetail', {tag});
                  } else {
                    navigation.navigate('AuthFailed');
                  }
                });
            }
          }}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 21,
              fontWeight: 'bold',
              letterSpacing: 0.25,
              color: 'black',
            }}>
            START AUTHENTICATION
          </Text>
        </Button>

        {/* <Button
          mode="contained"
          color="red"
          onPress={async () => {
            navigation.navigate('AuthFailed');
          }}
          style={{marginTop: 10, marginBottom: 10}}>
          Auth Failed
        </Button> */}
      </View>
    );
  }

  function renderNfcNotEnabled() {
    return (
      <View
        style={{
          flex: 2,
          alignItems: 'stretch',
          alignSelf: 'center',
          width,
        }}>
        <Text style={{textAlign: 'center', marginBottom: 10}}>
          Your NFC is not enabled. Please first enable it and hit 'check again'
          button
        </Text>

        <Button
          mode="contained"
          color="black"
          onPress={() => NfcProxy.goToNfcSetting()}
          style={{marginBottom: 10}}>
          GO TO NFC SETTINGS
        </Button>

        <Button
          mode="outlined"
          color="black"
          onPress={async () => {
            setEnabled(await NfcProxy.isEnabled());
          }}
          style={{marginBottom: 50, borderWidth: 2, borderColor: 'black'}}>
          CHECK AGAIN
        </Button>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <StatusBar hidden />
        <Backdrop scrollX={scrollX} />
        <Square scrollX={scrollX} />
        <Animated.FlatList
          data={DATA}
          keyExtractor={(item) => item.key}
          horizontal
          scrollEventThrottle={32}
          pagingEnabled
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 10}}
          renderItem={({item}) => {
            return (
              <View style={{width, alignItems: 'center', padding: 20}}>
                <View
                  style={{flex: 0.6, justifyContent: 'center', padding: 80}}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width: width / 2,
                      height: width / 2,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <View style={{flex: 0.2}}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 28,
                      marginBottom: 10,
                      color: 'white',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontWeight: '300',
                      color: 'white',
                    }}>
                    {item.description}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <View style={{alignItems: 'center', flex: 0.2}}>
          <Indicator scrollX={scrollX} />

          {supported && enabled && renderNfcButtons()}

          {supported && !enabled && renderNfcNotEnabled()}
        </View>
      </View>

      <IconButton
        icon={() => <Icon name="info-outline" size={25} />}
        style={styles.settingIcon}
        onPress={() => {
          navigation.navigate('Settings');
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({
  settingIcon: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 0 : 0,
    right: 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
