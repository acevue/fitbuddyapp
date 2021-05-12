import React, { useEffect } from 'react';
import { TextInput, Modal, Animated, ImageBackground, TouchableOpacity, Text, Button, View, StyleSheet, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../components/context';
import { Avatar } from 'react-native-elements';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Lightbox from 'react-native-lightbox';
import navigator from './contextz'
import ImageElement from './context2'
import { State } from 'react-native-gesture-handler';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import firestore from '@react-native-firebase/firestore';
import Status from './status';
import storage from '@react-native-firebase/storage';
import { utils } from '@react-native-firebase/app';
import { Appbar } from 'react-native-paper';
import { useState } from "react";
import ImagePicker from 'react-native-image-picker';
import GoogleFit, { Scopes } from 'react-native-google-fit'

const weight = ({ navigation }) => {

    const [y, setY] = useState("");

    const showweight = () => {

        // The list of available scopes inside of src/scopes.js file
        const options = {
            scopes: [
                Scopes.FITNESS_ACTIVITY_READ,
                Scopes.FITNESS_ACTIVITY_WRITE,
                Scopes.FITNESS_BODY_READ,
                Scopes.FITNESS_BODY_WRITE,
            ],
        }

        GoogleFit.authorize(options)
            .then(authResult => {
                if (authResult.success) {
                    const opt = {
                        unit: "pound", // required; default 'kg'
                        startDate: "2017-01-01T00:00:17.971Z", // required
                        endDate: new Date().toISOString(), // required
                        bucketUnit: "DAY", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
                        bucketInterval: 1, // optional - default 1. 
                        ascending: false // optional; default false
                    };

                    GoogleFit.getWeightSamples(opt).then((res) => {
                        const str1 = JSON.stringify(res[0].value).substring(0, 5) + " lbs";
                        setY(str1);
                    });

                } else {
                    alert("AUTH_DENIED", authResult.message);
                }
            })
            .catch(() => {
                alert("AUTH_ERROR");
            })
    }

    return (

        <ImageBackground source={require('../images/weight.jpg')} style={styles.image}>
            <View style={[{ marginTop: 110, height: 48, alignItems: "center", alignContent: "center", width: "100%", margin: 10 }]}>
                <Button onPress={showweight} title="Check Current Weight" >
                    Check Current Weight
                </Button>
            </View>
            <View>
                <Text style={{ color: "white", fontWeight: 'bold', fontSize: 80, marginTop: 40, textAlign: "left", borderRadius: 10, padding: 30 }}>Weight :        {y} </Text>
            </View>
            <View style={{ alignContent: "center", alignItems: "center", width: "100%", color: "#3cb371", fontWeight: 'bold', fontSize: 24, marginTop: 290, borderRadius: 10, padding: 10 }}>
                <Button onPress={() => navigation.navigate('Home')} title="Homepage" >
                    Homepage
                </Button>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    statusInput: {
    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        padding: 25
    },
    breh: {
        flex: 1,
        width: null,
    },
    header: {
        flex: 1.8,
        backgroundColor: "#92d6cd"
    },
    midSection: {
        flex: .2,
        backgroundColor: "#92d6cd"
    },
    footer: {
        flex: 2.5,
        alignItems: 'center'
    },
    wallpaper: {
        flex: 1,
        marginHorizontal: 6,
        marginTop: 6,
        marginBottom: 108,

    },
    wallpaperImage: {
        flex: 1,
        width: undefined,
    },
    avatar: {
        alignItems: 'center',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    followers: {
        flexDirection: 'row',
    },
    activityList: {
        flex: 1,
        flexDirection: 'row',
        width: 350,
        borderBottomWidth: 2,
        borderColor: '#d3d7db',
        paddingVertical: 15
    },

    container: {
        flex: 1,
        flexDirection: "column"
    },
    image: {
        flex: 1,
        resizeMode: "cover",
    },
    text: {
        color: "white",
        fontSize: 42,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000a0"
    }
});

export default weight;