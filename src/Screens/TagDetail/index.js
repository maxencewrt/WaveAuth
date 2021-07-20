import React from 'react';
import {StyleSheet, View, ScrollView, Text, Image} from 'react-native';
import {Component} from 'react';
import database, {firebase} from '@react-native-firebase/database';

class TagDetailScreen extends Component {
  state = {
    artwork: {
      Title: '',
      Artist: '',
      //All product informations
      PictureLink1: '',
      PictureLink2: '',
      Publisher: '',
      Producer: '',
      ReleaseDate: '',
      SerialNumber: '',
      Type: '',
      Weight: '',
      Edition: '',
      EditionSize: '',
      Materials: '',
      Measurements: '',
      //NFT informations
      NFT: '',
      NFTProvider: '',
      //Owner informations
      LastOwnershipUpdate: '',
      OwnerID: '',
      OwnerName: '',
    },
  };

  constructor(props) {
    super(props);

    const {tag} = props.route.params;
    const TagUID = tag.id;

    const myDatabase = firebase.database().ref('/Artworks/' + TagUID);
    this.subscriber = myDatabase.on('value', (snapshot) => {
      this.setState({
        NFCchipID: tag.id,
        artwork: {
          Title: snapshot.val().Title,
          Artist: snapshot.val().Artist,
          PictureLink1: snapshot.val().PictureLink1,
          PictureLink2: snapshot.val().PictureLink2,
          Publisher: snapshot.val().Publisher,
          Producer: snapshot.val().Producer,
          ReleaseDate: snapshot.val().ReleaseDate,
          SerialNumber: snapshot.val().SerialNumber,
          Tittle: snapshot.val().Tittle,
          Type: snapshot.val().Type,
          Weight: snapshot.val().Weight,
          Edition: snapshot.val().Edition,
          EditionSize: snapshot.val().EditionSize,
          Materials: snapshot.val().Materials,
          Measurements: snapshot.val().Measurements,
          //NFT informations
          NFT: snapshot.val().NFT,
          NFTProvider: snapshot.val().NFTProvider,
          //Owner informations
          LastOwnershipUpdate: snapshot.val().LastOwnershipUpdate,
          OwnerID: snapshot.val().OwnerID,
          OwnerName: snapshot.val().OwnerName,
        },
      });
    });
  }

  render() {
    return (
      <ScrollView style={[styles.wrapper, {padding: 10}]}>
        <View style={styles.section}>
          <Image
            style={{
              width: '100%',
              height: 400,
              borderRadius: 16,
              justifyContent: 'center',
            }}
            source={
              this.state.artwork.PictureLink1
                ? {uri: this.state.artwork.PictureLink1}
                : null
            }
          />
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              textAlign: 'center',
              padding: 8,
              marginTop: 8,
            }}>
            {this.state.artwork.Title} by {this.state.artwork.Artist}
          </Text>
        </View>
        {/* <View style={styles.sectionTempo}>
          <Text>NFC chip ID : {this.state.NFCchipID}</Text>
        </View> */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>General Information</Text>
          <Text> Title : {this.state.artwork.Title} </Text>
          <Text> Artist : {this.state.artwork.Artist} </Text>
          {/* <Text> Publisher : {this.state.artwork.Publisher} </Text>
          <Text> Producer : {this.state.artwork.Producer} </Text> */}
          <Text> Date : {this.state.artwork.ReleaseDate} </Text>
          <Text> Type : {this.state.artwork.Type} </Text>
          {/* <Text> Weight : {this.state.artwork.Weight} </Text> */}
          <Text> Measurements : {this.state.artwork.Measurements} </Text>
          {/* <Text> Edition : {this.state.artwork.Edition} </Text>
          <Text> EditionSize : {this.state.artwork.EditionSize} </Text>
          <Text> Materials : {this.state.artwork.Materials} </Text> */}
          <Text> Serial Number : {this.state.artwork.SerialNumber} </Text>
        </View>
        {/* <View style={styles.section}>
          <Text style={styles.sectionLabel}>Blockchain Information</Text>
          <Text> NFT : {this.state.artwork.NFT} </Text>
          <Text> NFTProvider : {this.state.artwork.NFTProvider} </Text>
        </View> */}
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
  },
  sectionLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: 'gray',
  },
});

export default TagDetailScreen;
