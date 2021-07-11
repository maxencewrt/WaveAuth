import React from 'react';
import {StyleSheet, View, ScrollView, Text, Image, Button, Linking} from 'react-native';
import firestore from "@react-native-firebase/firestore";
import { Component } from 'react';
import {getTechList} from '../../Utils/getTechList';

class AuthFailed extends Component {

    render() {
        return (
            //this.TagDetailScreen,
            <ScrollView style={[styles.wrapper, {padding: 10}]}>
                <View style={styles.section}>
                    <Image 
                        style={{width: '100%', height: 400, borderRadius: 16, justifyContent: 'center' }}
                        source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Stock-dialog-warning.svg/2048px-Stock-dialog-warning.svg.png'}}
                        // source={{uri : this.state.artwork.PictureLink1}} 
                        />
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Authentication Failed </Text>
                    <Text style={styles.sectionText}> 
                    Unfortunately, we were not able to detect a WeveAuth NFC Chip. 
                    If you think this is an error, do not hesitate to contact our expert service who will validate the authenticity of your product.</Text>
                </View>
                <View style={{padding: 12}}>
                    <Button
                    mode="contained"
                    color="black"
                    style={{marginTop: 8}}
                    title="Contact us"
                    onPress={() => {
                        Linking.openURL('https://waveauth.com')}}>
                    </Button>
                </View>
            </ScrollView>
        )
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
  },
  sectionLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: 'gray',
    textAlign: 'center'
  },
  sectionText: {
    textAlign: 'center'
  },
});

export default AuthFailed
