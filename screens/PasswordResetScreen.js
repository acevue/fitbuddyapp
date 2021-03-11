import React from 'react';

import { TextInput, Text, View, StyleSheet, TouchableOpacity , Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';



const PasswordResetScreen = ({navigation}) => {

    const [data,setData] = React.useState({
        email: '',
        textChange: false,
    });
    
    const textInputChange = (val) => {
        if(val.length > 0){
            setData({
                ...data,
                email: val,
                textChange: true
            })
        }
        else
            setData({
                ...data,
                email: val,
                textChange: false
            })
    }

    const resetPassword = (userEmail) => {
        auth()
        .sendPasswordResetEmail(userEmail)
        .then(() => {
            alert("Check your email")
            navigation.navigate('SplashScreen')
        })
        .catch(error => {
            if (error.code === 'auth/invalid-email') {
                alert('That email address is invalid!');
            }
            else if (error.code === 'auth/user-not-found') {
                alert("User credentials incorrect. Please try again.");
            }
            else{
                console.error(error);
            }
        });
    }


    return(
        <View style={styles.container}>
            <LinearGradient colors={['#1fcc87', '#0d6ad4']} style={styles.linearGradient}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Forgot your password?</Text>
                </View>
                <View style={styles.footer}>
                    <View style={styles.input}>
                        <Icon name="user-o" size={25} color="#d3d7db" style={{marginRight: 5}}/>
                        <TextInput
                            placeholder= "Email"
                            placeholderTextColor= "#d3d7db"
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={(val)=> textInputChange(val)}
                        />
                        {data.textChange ?
                            <MaterialIcon name="checkbox-marked-circle-outline" size={25} color="#00ff1a"/>
                        :
                            null
                        }
                    </View>
                    <View style={{marginTop: 20}}>
                        <TouchableOpacity style={styles.button} onPress={()=> {resetPassword(data.email)}}>
                                <Text style={styles.buttonText}>Send a password reset email</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    headerText: {
        fontWeight: 'bold',
        marginTop: 130,
        fontSize: 35,
        marginLeft: 30,
        color: '#d3d7db'
    },
    linearGradient: {
        flex: 1,
        height: '100%'
    },
    logo: {
        width: height_logo,
        height: height_logo,
    },
    header: {
        flex: 1,
        marginTop: 60,
    },
    footer: {
        flex: 2,
        alignItems: 'center'
    },
    textInput: {
        fontSize: 17,
        flex:1,
        height: 40,
        borderColor: "white",
        color: "white",
    },
    input: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: "#d3d7db",
        width: 350,
        marginTop: 25
    },
    button: {
        width: 350,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        borderWidth:1,
        borderColor: '#d3d7db'
    },
    buttonText: {
        color: '#d3d7db',
        fontWeight: 'bold',
        fontSize: 17
    }
});

export default PasswordResetScreen;