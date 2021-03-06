import React from 'react';
import {Image, Text, View, Animated, StyleSheet, Modal} from 'react-native';
import {Button} from 'react-native-paper';
import NfcManager from 'react-native-nfc-manager';
import {useRevent} from 'revent-lib';

function NfcPromptAndroid(props) {
  const [visible, setVisible] = React.useState(false);
  const animValue = React.useRef(new Animated.Value(0)).current;
  const [_data, _setData] = useRevent('androidPrompt');
  const {visible: _visible, message = ''} = _data || {};

  React.useEffect(() => {
    if (_visible) {
      setVisible(true);
      Animated.timing(animValue, {
        duration: 300,
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animValue, {
        duration: 200,
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
      });
    }
  }, [_visible, animValue]);

  function cancelNfcScan() {
    setTimeout(() => {
      NfcManager.cancelTechnologyRequest().catch(() => 0);
    }, 200);
    _setData({visible: false, message});
  }

  const bgAnimStyle = {
    backgroundColor: 'rgba(0,0,0,0.3)',
    opacity: animValue,
  };

  const promptAnimStyle = {
    transform: [
      {
        translateY: animValue.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0],
        }),
      },
    ],
  };

  return (
    <Modal transparent={true} visible={visible}>
      <View style={[styles.wrapper]}>
        <View style={{flex: 1}} />

        <Animated.View style={[styles.prompt, promptAnimStyle]}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Ready to Scan</Text>

            <Image
              source={{
                uri:
                  'https://waveauth.app/wp-content/uploads/2021/07/animated-nfc.gif',
              }}
              style={{width: '100%', height: 150, padding: 20}}
              resizeMode="contain"
            />

            <Text>Hold your phone near the NFC tag</Text>
          </View>

          <Button mode="contained" onPress={cancelNfcScan} color="black">
            CANCEL
          </Button>
        </Animated.View>

        <Animated.View style={[styles.promptBg, bgAnimStyle]} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  promptBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  prompt: {
    height: 300,
    alignSelf: 'stretch',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 20,
    zIndex: 2,
  },
});

export default NfcPromptAndroid;
