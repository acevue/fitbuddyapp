import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import SplashScreen from './SplashScreen';
import PasswordResetScreen from './PasswordResetScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import UploadImage from './UploadImage';

const Drawer = createDrawerNavigator();

const signOut = () => {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
}

const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Sign Out" onPress={() => signOut()} />
        </DrawerContentScrollView>
    );
}

const RootDrawerScreen = ({ navigation }) => (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="LoginScreen" component={LoginScreen} />
        <Drawer.Screen name="UploadImage" component={UploadImage} />
    </Drawer.Navigator>
);



export default RootDrawerScreen;