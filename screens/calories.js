import React, { useEffect } from 'react';
import { TextInput, Modal, Animated, TouchableOpacity, Text, ImageBackground, Button, View, StyleSheet, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
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

const calories = ({ navigation }) => {

    const [z, setZ] = useState("");

    const goog = () => {
        // The list of available scopes inside of src/scopes.js file
        const options = {

            scopes: [
                Scopes.FITNESS_ACTIVITY_READ,
                Scopes.FITNESS_ACTIVITY_WRITE,
                Scopes.FITNESS_BODY_READ,
                Scopes.FITNESS_BODY_WRITE,
                Scopes.FITNESS_ACTIVITY_READ,
                Scopes.FITNESS_ACTIVITY_WRITE,
                Scopes.FITNESS_HEART_RATE_READ,
                Scopes.FITNESS_HEART_RATE_WRITE,
                Scopes.FITNESS_BLOOD_PRESSURE_READ,
                Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
                Scopes.FITNESS_BLOOD_GLUCOSE_READ,
                Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
            ],
        }

        GoogleFit.openFit();
    }

    const showcalories = () => {

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
                        startDate: "2021-04-29T00:00:17.107Z", // required
                        endDate: new Date().toISOString(), // required
                        basalCalculation: true, // optional, to calculate or not basalAVG over the week
                        bucketUnit: "DAY", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
                        bucketInterval: 1, // optional - default 1. 
                    };

                    GoogleFit.getDailyCalorieSamples(opt).then((res) => {
                        var curdate = new Date().toISOString();
                        var strdat = curdate.substring(0, 10) + 'T00:00:17.107Z';
                        var x = res.filter((item) => item.startDate == strdat).map(({ calorie, endDate, startDate }) => ({ calorie, endDate, startDate }));
                        const str1 = JSON.stringify(x[0].calorie).substring(1, 7);
                        setZ(str1);
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

        <ImageBackground source={require('../images/calories.jpg')} style={styles.image}>
            <View style={[{ marginTop: 55, height: 48, alignItems: "center", alignContent: "center", width: "60%", margin: 10 }]}>
                <Button onPress={showcalories} title="Check Calories Burned" >
                    Check Calories Burned
                </Button>
            </View>
            <View>
                <Text style={{ color: "white", fontWeight: 'bold', fontSize: 80, marginTop: 77, textAlign: "right", borderRadius: 10, padding: 30 }}>Calories Burned : {z}</Text>
            </View>
            <View style={[{ marginTop: 55, height: 48, alignItems: "center", alignContent: "center", width: "95%", margin: 10 }]}>
                <Button onPress={goog} title="Open Google Fit" >
                    Open Google Fit
                </Button>
            </View>
            <View style={{ alignContent: "center", alignItems: "center", width: "100%", color: "#3cb371", fontWeight: 'bold', fontSize: 24, marginTop: 90, borderRadius: 10, padding: 10 }}>
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

export default calories;