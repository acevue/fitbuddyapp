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
import steps from './steps';
import calories from './calories';
import height from './height';
import weight from './weight';

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
        <Drawer.Screen name="Home" component={LoginScreen} />
        <Drawer.Screen name="Check Steps (DAILY)" component={steps} />
        <Drawer.Screen name="Check Calories (Daily)" component={calories} />
        <Drawer.Screen name="Check Height" component={height} />
        <Drawer.Screen name="Check Weight" component={weight} />
    </Drawer.Navigator>
);



export default RootDrawerScreen;