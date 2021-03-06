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
import OfflineNotice from '../../Components/OfflineNotice';
import {Button, IconButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';

const {width, height} = Dimensions.get('screen');

const data = [
  'http://waveauth.app/wp-content/uploads/2021/08/3_3@2x.png',
  'http://waveauth.app/wp-content/uploads/2021/08/2_2@2x.png',
  'http://waveauth.app/wp-content/uploads/2021/08/3_2@2x.png',
  //'https://cdn.dribbble.com/users/3281732/screenshots/13130602/media/592ccac0a949b39f058a297fd1faa38e.jpg?compress=1&resize=1200x1200',
  //'https://cdn.dribbble.com/users/3281732/screenshots/13661330/media/1d9d3cd01504fa3f5ae5016e5ec3a313.jpg?compress=1&resize=1200x1200',
];

const imageW = width * 0.75;
const imageH = imageW * 1.54;

function HomeScreen(props) {
  const {navigation} = props;
  const [supported, setSupported] = React.useState(null);
  const [enabled, setEnabled] = React.useState(null);
  const padding = 40;
  const width = Dimensions.get('window').width - 2 * padding;
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
          flex: 2,
          alignItems: 'stretch',
          alignSelf: 'center',
          width,
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
          }}
          style={{marginTop: 10, marginBottom: 10}}>
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

  const Indicator = ({scrollX}) => {
    return (
      <View style={{position: 'absolute', flexDirection: 'row'}}>
        {data.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: 'clamp',
          });
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={`indicator-${i}`}
              style={{
                height: 10,
                width: 10,
                borderRadius: 5,
                backgroundColor: '#fff',
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

  return (
    <>
      {/* <StatusBar translucent backgroundColor="transparent" /> */}
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView />
      <View style={{flex: 1, padding}}>
        <View style={StyleSheet.absoluteFillObject}>
          {data.map((image, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0, 1, 0],
            });
            return (
              <Animated.Image
                key={`image-${index}`}
                source={{uri: image}}
                style={[
                  StyleSheet.absoluteFillObject,
                  {
                    opacity,
                  },
                ]}
                blurRadius={10}
              />
            );
          })}
        </View>
        <Animated.FlatList
          data={data}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: true},
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <View
                style={{width, justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={{uri: item}}
                  style={{
                    width: imageW,
                    height: imageH,
                    resizeMode: 'cover',
                    borderRadius: 16,
                  }}
                />
              </View>
            );
          }}
        />
        <View style={{padding, justifyContent: 'center', alignItems: 'center'}}>
          <Indicator scrollX={scrollX} />
        </View>

        {supported && !enabled && renderNfcNotEnabled()}

        {supported && enabled && renderNfcButtons()}
        <IconButton
          icon={() => <Icon name="info-outline" size={25} />}
          style={styles.settingIcon}
          onPress={() => {
            navigation.navigate('Settings');
          }}
        />
        {/* <OfflineNotice /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  settingIcon: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 0 : 0,
    right: 0,
  },
});

export default HomeScreen;
