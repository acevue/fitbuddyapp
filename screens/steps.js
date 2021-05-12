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

const steps = ({ navigation }) => {

    const [y, setY] = useState("");

    const showsteps = () => {

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
                        startDate: "2021-04-29T00:00:17.107Z", // required ISO8601Timestamp
                        endDate: new Date().toISOString(), // required ISO8601Timestamp
                        bucketUnit: "DAY", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
                        bucketInterval: 1, // optional - default 1. 
                    };

                    GoogleFit.getDailyStepCountSamples(opt)
                        .then((res) => {
                            var data1 = res[1];
                            var resttt = data1["steps"];
                            var curdate = new Date().toISOString();
                            var x = resttt.filter((item) => item.date == curdate.substring(0, 10)).map(({ date, value }) => ({ date, value }));
                            const str1 = JSON.stringify(x[0].value);
                            setY(str1);
                        })
                        .catch((err) => { console.warn(err) });
                } else {
                    alert("AUTH_DENIED", authResult.message);
                }
            })
            .catch(() => {
                alert("AUTH_ERROR");
            })
    }

    return (

        <ImageBackground source={require('../images/steps.jpg')} style={styles.image}>
            <View style={[{ marginTop: 55, height: 48, alignItems: "center", alignContent: "center", width: "60%", margin: 10 }]}>
                <Button onPress={showsteps} title="Check Steps Taken" >
                    Check Steps Taken
                </Button>
            </View>
            <View>
                <Text style={{ fontWeight: 'bold', fontSize: 80, marginTop: 40, textAlign: "right", borderRadius: 10, padding: 30 }}>Steps Taken : {y} </Text>
            </View>
            <View style={{ alignContent: "center", alignItems: "center", width: "100%", color: "#3cb371", fontWeight: 'bold', fontSize: 24, marginTop: 260, borderRadius: 10, padding: 10 }}>
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

export default steps;