import React from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import firestore from "@react-native-firebase/firestore";
import { Component } from 'react';

class FirestoreScreen extends Component {

    state = {
        user: {
            Publisher : ""
        }
    }

    constructor(props){
        super(props);
        this.getUser();
        this.subscriber = firestore().collection("Artworks").doc("pszURAwOJsHoOgRcuoDr").onSnapshot(doc => {
            this.setState({ 
                user : { 
                    Publisher : doc.data().Publisher
            }})
        })
    }

    getUser = async () => {
        const userDocument = await firestore().collection("Artworks").doc("pszURAwOJsHoOgRcuoDr").get();
        console.log(userDocument)
    }

    render() {
        return (
            <View>
                <Text> toto : {this.state.user.Publisher}   </Text>
            </View>
        )
    }
}


// function FirestoreScreen(props) {

//     const test = firestore().collection('Users').doc('Etd3nbWHWSsl748Wk952').get();
//     return (
//         <ScrollView style={[styles.wrapper, {padding: 10}]}>
//         <View style={styles.section}>
//         <Text>Mettre les photos via lien HTML</Text>
//         {test}
//         </View>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     flex: 1,
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   section: {
//     padding: 8,
//     borderRadius: 8,
//     backgroundColor: 'white',
//     marginBottom: 15,
//   },
//   sectionLabel: {
//     fontSize: 16,
//     marginBottom: 5,
//     color: 'gray',
//   },
// });

export default FirestoreScreen
