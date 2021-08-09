import * as React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  Animated,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import NfcProxy from '../../NfcProxy';
import {Button, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';

const {width, height} = Dimensions.get('screen');

const DATA = [
  {
    key: '3571572',
    title: 'Locate the chip',
    description:
      'Please find where is the WaveAuth chip located, you can refer to the information provided by the seller',
    image: 'http://waveauth.app/wp-content/uploads/2021/08/3_3@2x.png',
  },
  {
    key: '3571747',
    title: 'Scan the chip',
    description:
      'Put your phone close to the chip and click on the "Strat Authentication" button. We are using NFC technology.',
    image: 'http://waveauth.app/wp-content/uploads/2021/08/2_2@2x.png',
  },
  {
    key: '3571680',
    title: 'Vérify authenticity',
    description:
      'When a chip is discovered, the app will tell you if the collectible is registered in our Database and linked to a NFT.',
    image: 'http://waveauth.app/wp-content/uploads/2021/08/3_2@2x.png',
  },
];

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
              height: 8,
              width: 8,
              marginTop: 15,
              borderRadius: 5,
              backgroundColor: 'black',
              opacity,
              margin: 8,
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
    outputRange: ['0deg', '0deg', '0deg'],
  });

  const translateX = YOLO.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -height, 0],
  });

  return (
    <Animated.View
      style={{
        width: width,
        height: height,
        backgroundColor: 'white',
        borderRadius: 50,
        position: 'absolute',
        top: -height * 0.4,
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
          color="black"
          onPress={async () => {
            const tag = await NfcProxy.readTag();
            if (tag) {
              database()
                .ref('/Artworks/' + tag.id)
                .on('value', (snapshot) => {
                  const dataGet = snapshot.val();
                  if (dataGet != undefined) {
                    navigation.navigate('TagDetail', {tag});
                  } else {
                    navigation.navigate('AuthFailed');
                  }
                });
            }
          }}>
          START AUTHENTICATION
        </Button>
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
        <Text style={{textAlign: 'center', marginBottom: 10, color: 'white'}}>
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
        <StatusBar backgroundColor="white" barStyle="dark-content" />
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
                <View style={{flex: 0.85, justifyContent: 'center'}}>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width: width / 1.2,
                      height: width / 1.2,
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
                      color: 'black',
                      textAlign: 'center',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      color: 'grey',
                      textAlign: 'center',
                    }}>
                    {item.description}
                  </Text>
                </View>
              </View>
            );
          }}
        />
        <View style={{alignItems: 'center', flex: 0.15}}>
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
    backgroundColor: '#f9f4f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
