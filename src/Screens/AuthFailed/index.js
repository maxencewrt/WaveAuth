import React from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Button,
  Linking,
  Dimensions,
} from 'react-native';
import {Component} from 'react';

const {width, height} = Dimensions.get('screen');

class AuthFailed extends Component {
  render() {
    return (
      <ScrollView style={[styles.wrapper, {padding: 10}]}>
        <View style={styles.sectionImage}>
          <Image
            style={{
              width: width / 1.5,
              height: width / 1.5,
              borderRadius: 16,
              justifyContent: 'center',
            }}
            source={{
              uri: 'http://waveauth.app/wp-content/uploads/2021/08/4_2@2x.png',
            }}
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Authentication Failed </Text>
          <Text style={styles.sectionText}>
            Unfortunately, we were not able to detect a WeveAuth NFC Chip. If
            you think this is an error, do not hesitate to contact our expert
            service who will validate the authenticity of your product.
          </Text>
        </View>
        <View style={{padding: 12}}>
          <Button
            mode="contained"
            color="black"
            style={{marginTop: 8}}
            title="Contact us"
            onPress={() => {
              Linking.openURL('https://waveauth.app/#contact');
            }}></Button>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    marginBottom: 15,
    alignItems: 'center',
  },
  sectionImage: {
    padding: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  sectionLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: 'gray',
    textAlign: 'center',
  },
  sectionText: {
    textAlign: 'center',
  },
});

export default AuthFailed;
