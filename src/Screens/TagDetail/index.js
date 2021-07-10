import React from 'react';
import {StyleSheet, View, ScrollView, Text, Image, Button, Linking} from 'react-native';
import firestore from "@react-native-firebase/firestore";
import { Component } from 'react';
import {getTechList} from '../../Utils/getTechList';

class TagDetailScreen extends Component {

    state = {
        artwork: {
            //All product informations
            PictureLink1:"",
            PictureLink2:"",
            Publisher: "",
            Producer:"",
            ReleaseDate:"",
            SerialNumber:"",
            Tittle:"",
            Type:"",
            Weight:"",
            Edition :"",
            EditionSize :"",
            Materials:"",
            Measurements:"",
            //NFT informations
            NFT:"",
            NFTProvider:"",
            //Owner informations
            LastOwnershipUpdate:"",
            OwnerID:"",
            OwnerName:"",
        }
    }

    
    constructor(props){
        
        const {tag} = props.route.params;

        super(props);
        this.subscriber = firestore().collection("Artworks").doc("pszURAwOJsHoOgRcuoDr").onSnapshot(doc => {
            this.setState({ 
                NFCchipID: tag.id,
                artwork : { 
                    PictureLink1: doc.data().PictureLink1,
                    PictureLink2: doc.data().PictureLink2,
                    Publisher: doc.data().Publisher,
                    Producer: doc.data().Producer,
                    ReleaseDate: doc.data().ReleaseDate,
                    SerialNumber: doc.data().SerialNumber,
                    Tittle: doc.data().Tittle,
                    Type: doc.data().Type,
                    Weight: doc.data().Weight,
                    Edition : doc.data().Edition,
                    EditionSize : doc.data().EditionSize,
                    Materials: doc.data().Materials,
                    Measurements: doc.data().Measurements,
                    //NFT informations
                    NFT: doc.data().NFT,
                    NFTProvider: doc.data().NFTProvider,
                    //Owner informations
                    LastOwnershipUpdate: doc.data().LastOwnershipUpdate,
                    OwnerID: doc.data().OwnerID,
                    OwnerName: doc.data().OwnerName,
            }})
        })
    }

    render() {
        return (
            //this.TagDetailScreen,
            <ScrollView style={[styles.wrapper, {padding: 10}]}>
                <View style={styles.section}>
                    <Image 
                        style={{width: '100%', height: 400, borderRadius: 16, justifyContent: 'center' }}
                        source={ this.state.artwork.PictureLink1 ? {uri:  this.state.artwork.PictureLink1 } : null}
                        // source={{uri : this.state.artwork.PictureLink1}} 
                        />
                </View>
                <View style={styles.sectionTempo}>
                    <Text> NFC chip ID :  {this.state.NFCchipID} </Text>                             
                </View>
                <View style={styles.section}>
                <Text style={styles.sectionLabel}>General Informations</Text>
                    <Text> Tittle : {this.state.artwork.Tittle}   </Text>  
                    <Text> Publisher : {this.state.artwork.Publisher}   </Text>             
                    <Text> Producer : {this.state.artwork.Producer}   </Text>              
                    <Text> ReleaseDate : {this.state.artwork.ReleaseDate}   </Text>                     
                    <Text> Type : {this.state.artwork.Type}   </Text>                  
                    <Text> Weight : {this.state.artwork.Weight}   </Text>  
                    <Text> Measurements : {this.state.artwork.Measurements} </Text>              
                    <Text> Edition : {this.state.artwork.Edition}   </Text>               
                    <Text> EditionSize : {this.state.artwork.EditionSize}   </Text>           
                    <Text> Materials : {this.state.artwork.Materials}   </Text>             
                    <Text> SerialNumber : {this.state.artwork.SerialNumber}   </Text>        
                </View>
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Blockchain Informations</Text>
                    <Text> NFT : {this.state.artwork.NFT}   </Text>                   
                    <Text> NFTProvider : {this.state.artwork.NFTProvider}   </Text>           
                </View>
                <View style={styles.section}>                    
                <Text style={styles.sectionLabel}>Owner Informations</Text>
                    <Text> LastOwnershipUpdate : {this.state.artwork.LastOwnershipUpdate}   </Text>   
                    <Text> OwnerID : {this.state.artwork.OwnerID}   </Text>               
                    <Text> OwnerName : {this.state.artwork.OwnerName}   </Text>           
                </View>
                <View style={{padding: 12}}>
                    <Button
                    mode="contained"
                    color="black"
                    style={{marginTop: 8}}
                    title="add to collection"
                    onPress={() => {
                        Linking.openURL('https://mystudiolo.com')}}>
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
  sectionTempo: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'orange',
    marginBottom: 15,
  },
  sectionLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: 'gray',
  },
});

export default TagDetailScreen
