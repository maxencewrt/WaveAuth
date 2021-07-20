import React from 'react';
import {
  Image,
  Linking,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Platform,
  Keyboard,
  Dimensions,
} from 'react-native';
import {List, Button} from 'react-native-paper';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import {version} from '../../../package.json';

const {width, height} = Dimensions.get('screen');

function SettingsScreen(props) {
  const [nfcStatus, setNfcStatus] = React.useState(null);
  const [keyboardPadding, setKeyboardPadding] = React.useState(0);
  const scrollViewRef = React.useRef();
  const scrollPosRef = React.useRef(0);

  React.useEffect(() => {
    function onNfcStateChanged(evt = {}) {
      const {state} = evt;
      setNfcStatus(state === 'on');
    }

    async function checkNfcState() {
      setNfcStatus(await NfcManager.isEnabled());
      NfcManager.setEventListener(NfcEvents.StateChanged, onNfcStateChanged);
    }

    if (Platform.OS === 'android') {
      checkNfcState();
    }

    return () => {
      if (Platform.OS === 'android') {
        NfcManager.setEventListener(NfcEvents.StateChanged, null);
      }
    };
  });

  React.useEffect(() => {
    async function onKbShow() {
      const estimatedKbHeight = Dimensions.get('window').width;
      setKeyboardPadding(estimatedKbHeight);
      setTimeout(() => {
        scrollViewRef.current.scrollTo({
          y: scrollPosRef.current + estimatedKbHeight,
        });
      }, 200);
    }

    function onKbHide() {
      setKeyboardPadding(0);
    }

    if (Platform.OS === 'ios') {
      Keyboard.addListener('keyboardWillShow', onKbShow);
      Keyboard.addListener('keyboardWillHide', onKbHide);
    }

    return () => {
      if (Platform.OS === 'ios') {
        Keyboard.removeListener('keyboardWillShow', onKbShow);
        Keyboard.removeListener('keyboardWillHide', onKbHide);
      }
    };
  });

  return (
    <ScrollView
      style={[styles.wrapper]}
      ref={scrollViewRef}
      onScroll={({nativeEvent}) => {
        scrollPosRef.current = nativeEvent.contentOffset.y;
      }}
      keyboardShouldPersistTaps="handled">
      <View style={styles.topBanner}>
        <Image
          style={{
            width: width / 2.5,
            height: width / 2.5,
            borderRadius: 16,
            justifyContent: 'center',
          }}
          source={{
            uri:
              'http://waveauth.app/wp-content/uploads/2021/07/WaveAuthLogoBackTransparent.png',
          }}
        />
      </View>
      <List.Section>
        <List.Item
          title="Description"
          //description="WaveAuth is not only an app but a whole authentication process."
          description="We allows you to ensure your collectibles are authentic with the NFC and Blockchain technologies."
        />

        <List.Item title="Version" description={version} />

        <List.Item
          title="WaveAuth website"
          description="https://waveauth.app/"
          onPress={() => {
            Linking.openURL('https://waveauth.app/');
          }}
        />
        <List.Item
          title="Contact us"
          description="contact@waveauth.app"
          onPress={() => {
            Linking.openURL('https://waveauth.app/#contact');
          }}
        />
      </List.Section>
      {keyboardPadding > 0 && <View style={{height: keyboardPadding}} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  topBanner: {
    borderRadius: 6,
    margin: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  maintainerIcon: {
    width: 54,
    height: 54,
    overflow: 'hidden',
    borderRadius: 150,
  },
});

export default SettingsScreen;
