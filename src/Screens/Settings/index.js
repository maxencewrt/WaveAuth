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

const generalText = `
Welcome to WaveAuth application, this project aims to authenticate your favorite articles.

To find out more you can visit our site below.

https://waveauth.com/
`;

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
        <Text style={{lineHeight: 16}}>{generalText}</Text>
      </View>
      <List.Section>
        {Platform.OS === 'android' && (
          <>
            <List.Item
              title="NFC Status"
              description={
                nfcStatus === null ? '---' : nfcStatus ? 'ON' : 'OFF'
              }
            />
            <List.Item
              title="NFC Settings"
              description="Jump to System NFC Settings"
              onPress={() => {
                NfcManager.goToNfcSetting();
              }}
            />
          </>
        )}
        <List.Item title="Version" description={version} />

        <List.Item
          title="WaveAuth Website"
          description="https://waveauth.com/"
          onPress={() => {
            Linking.openURL(
              'https://github.com/revtel/react-native-nfc-rewriter',
            );
          }}
        />
        <List.Subheader>Team</List.Subheader>
        <List.Item
          title="Kevin GERMAIN"
          left={() => (
            <Image
              source={{
                uri:
                  'https://media-exp3.licdn.com/dms/image/C4D03AQEuu_SiVyoTtA/profile-displayphoto-shrink_400_400/0/1576625327623?e=1629331200&v=beta&t=fsV0HLZO2BZBBo3a6A93QGcw1arKqx_leunxxsD56bA',
              }}
              style={styles.maintainerIcon}
              resizeMode="contain"
            />
          )}
          description="linkedin - Kevin Germain"
          onPress={() => {
            Linking.openURL('https://www.linkedin.com/in/kevin-g/');
          }}
        />
        <List.Item
          title="Vladimir IGNATOVIC"
          left={() => (
            <Image
              source={{
                uri:
                  'https://media-exp3.licdn.com/dms/image/C5603AQE7OEEatDWt4A/profile-displayphoto-shrink_400_400/0/1537862688780?e=1629331200&v=beta&t=gC0Afnc8HYFGQt3URuxwCHWUWxwDXjsOBi_6EsKDhW0',
              }}
              style={styles.maintainerIcon}
              resizeMode="contain"
            />
          )}
          description="linkedin - Vladimir Ignatovic"
          onPress={() => {
            Linking.openURL(
              'https://www.linkedin.com/in/vladimir-ignjatovic-958784137/',
            );
          }}
        />
        <List.Item
          title="Maxence Wurth"
          left={() => (
            <Image
              source={{
                uri:
                  'https://media-exp3.licdn.com/dms/image/C4D03AQH1TiXEPtYwDQ/profile-displayphoto-shrink_800_800/0/1579628394334?e=1629331200&v=beta&t=Ra9ZIfhCsyJSNqzeeCGVW2EN5CGeKACxEHKPbqfa-dE',
              }}
              style={styles.maintainerIcon}
              resizeMode="contain"
            />
          )}
          description="linkedin - Maxence Wurth"
          onPress={() => {
            Linking.openURL('https://www.linkedin.com/in/maxence-wurth/');
          }}
        />
      </List.Section>
      <View style={{padding: 12}}>
        <Button
          mode="contained"
          color="black"
          style={{marginTop: 8}}
          onPress={() => {
            Linking.openURL('mailto:support@waveauth.com');
          }}>
          contact us
        </Button>
      </View>

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
    backgroundColor: 'white',
  },
  maintainerIcon: {
    width: 54,
    height: 54,
    overflow: 'hidden',
    borderRadius: 150,
  },
});

export default SettingsScreen;
