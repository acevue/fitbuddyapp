import React, { useEffect } from 'react';
import { TextInput, Modal, Animated, TouchableOpacity, Text, Button, View, StyleSheet, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
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
                            const str1 = 'Daily Steps >>>' + JSON.stringify(x[0].value);
                            alert(str1);
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

        <TouchableOpacity onPress={() => showsteps()}>
            <Text style={{ marginLeft: 5, borderRadius: 5, padding: 5, backgroundColor: '#9bd494' }}>Display Steps Taken</Text>
        </TouchableOpacity>

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
    container: {
        flex: 1
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
    }
});

export default steps;