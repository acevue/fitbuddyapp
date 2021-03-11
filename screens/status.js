import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native'
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


var leet ='';
  
function grabStatus() {
    const bob = 'Users/'+auth().currentUser.uid+'/Status';
    firestore()
    .collection(bob)
    .get()
    .then(querySnapshot => {
      for(i=0;i<querySnapshot._docs.length;i++){
        console.log(i);
        console.log(querySnapshot._docs[i]._data.status);
        leet+=querySnapshot._docs[i]._data.status+'\n';
      }
      // console.log(querySnapshot._docs[0]._data.status);
      // console.log(querySnapshot._docs.length);
    });
    return leet;
  }


export default function Status(){
    
    grabStatus();
    return (
        <View>
            <Text>{leet}</Text>
        </View>
    )

}
 