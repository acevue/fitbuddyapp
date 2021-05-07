import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { TextInput, Modal, Animated, TouchableOpacity, Text, Button, View, StyleSheet, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import SplashScreen from './SplashScreen';
import PasswordResetScreen from './PasswordResetScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import UploadImage from './UploadImage';
import steps from './steps';
import calories from './calories';
import height from './height';
import weight from './weight';
import BloodPressure from './BloodPressure';
import HeartRate from './HeartRate';
import Sleep from './Sleep';
import GoogleFit, { Scopes } from 'react-native-google-fit'

const Drawer = createDrawerNavigator();

const signOut = () => {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
}

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

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Google Fit" onPress={() => goog()} />
            <DrawerItem label="Sign Out" onPress={() => signOut()} />
        </DrawerContentScrollView>
    );
}

const RootDrawerScreen = ({ navigation }) => (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} >
        <Drawer.Screen name="Home" component={LoginScreen} />
        <Drawer.Screen name="Steps Taken (DAILY)" component={steps} />
        <Drawer.Screen name="Calories Burned (Daily)" component={calories} />
        <Drawer.Screen name="Height (Current)" component={height} />
        <Drawer.Screen name="Weight (Current)" component={weight} />
        <Drawer.Screen name="Check Blood Pressure" component={BloodPressure} />
        <Drawer.Screen name="TODO: Check Heart Rate" component={HeartRate} />
        <Drawer.Screen name="Check Sleep" component={Sleep} />
    </Drawer.Navigator>
);

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
    back: {
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
        marginTop: 18
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

export default RootDrawerScreen;