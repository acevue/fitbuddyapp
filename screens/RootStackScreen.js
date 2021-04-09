import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'
import SplashScreen from './SplashScreen';
import PasswordResetScreen from './PasswordResetScreen';
import UploadImage from './UploadImage';


const RootStack = createStackNavigator();

const RootStackScreen = ({ navigation }) => (
    <RootStack.Navigator headerMode="none">
        <RootStack.Screen name="SplashScreen" component={SplashScreen} />
        <RootStack.Screen name="LoginScreen" component={LoginScreen} />
        <RootStack.Screen name="RegisterScreen" component={RegisterScreen} />
        <RootStack.Screen name="PasswordResetScreen" component={PasswordResetScreen} />
        <RootStack.Screen name="UploadImage" component={UploadImage} />
    </RootStack.Navigator>
);

export default RootStackScreen;