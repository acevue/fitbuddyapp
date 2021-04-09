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
import ImagePicker from 'react-native-image-picker';
import { useState } from "react";

const UploadImage = ({ navigation }) => {

    const [imageSource, setImageSource] = useState(null);

    function selectImage() {

        let options = {
            title: 'You can choose one image',
            maxWidth: 256,
            maxHeight: 256,
            noData: true,
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.launchImageLibrary(options, response => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
                alert('You did not select any image');
            } else if (response.error) {
                alert('ImagePicker Error: ');
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                let source = { uri: response.uri };
                // ADD THIS
                setImageSource(source.uri);
            }
        });
    }

    return (

        <View style={styles.container}>

            <View style={styles.avatar}>
                <Text>Avatar Image</Text>
                <TouchableOpacity onPress={selectImage}>
                    <Text >Pick an image</Text>
                </TouchableOpacity>
                {imageSource === null ? (
                    <Avatar
                        source={require('../images/profile_pic.jpg')}
                        rounded
                        size={180}
                        interactive
                    />
                ) : (
                    <Avatar
                        source={{ uri: imageSource }}
                        rounded
                        size={180}
                        interactive
                    />
                )}
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen', { paramKey: imageSource })}>
                    <Text >Return to Homepage</Text>
                </TouchableOpacity>
            </View>

        </View >
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

export default UploadImage;