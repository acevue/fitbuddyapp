import React from 'react';

import { TextInput, Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import auth from '@react-native-firebase/auth';


const SplashScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        textChange: false,
        secureTextEntry: true,
        email: '',
        password: ''
    });

    const toggleSecureText = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const textInputChange = (val) => {
        if (val.length > 0) {
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

    const passwordInputChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }

    const loginUser = (userEmail, userPassword) => {

        if (userEmail === "") {
            alert("Email is empty. Please enter an email.")
        } else if (userPassword === "") {
            alert("Password is empty. Please enter a password.")
        } else {

            auth()
                .signInWithEmailAndPassword(userEmail, userPassword)
                .then(() => {
                    console.log('User Logged In');
                })
                .catch(error => {
                    if (error.code === 'auth/invalid-email') {
                        alert("The email address is invalid");
                    }

                    else if (error.code === 'auth/user-not-found') {
                        alert("User credentials incorrect. Please try again.");
                    }

                    else {
                        console.log(error);
                    }
                });

        }
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1fcc87', '#0d6ad4']} style={styles.linearGradient}>
                <View style={styles.header}>
                    <Animatable.Image animation="fadeInLeftBig" duration={3000}
                        style={styles.logo}
                        source={require('../images/logo.png')}
                        resizeMode="stretch"
                    />
                </View>
                <View style={styles.footer}>
                    <View style={styles.input}>
                        <Icon name="user-o" size={25} color="#d3d7db" style={{ marginRight: 5 }} />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#d3d7db"
                            style={styles.textInput}
                            autoCapitalize='none'
                            onChangeText={(val) => textInputChange(val)}
                        />
                        {data.textChange ?
                            <MaterialIcon name="checkbox-marked-circle-outline" size={25} color="#00ff1a" />
                            :
                            null
                        }
                    </View>
                    <View style={[styles.input, { marginTop: 20, marginLeft: -4 }]}>
                        <MaterialIcon name="lock-outline" size={30} color="#d3d7db" style={styles.icon} />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#d3d7db"
                            style={styles.textInput}
                            autoCapitalize='none'
                            secureTextEntry={data.secureTextEntry}
                            onChangeText={(val) => passwordInputChange(val)}
                        />
                        <TouchableOpacity onPress={() => toggleSecureText()}>
                            {data.secureTextEntry ?
                                <MaterialIcon name="eye-off" size={25} color="#d3d7db" />
                                :
                                <MaterialIcon name="eye" size={25} color="#d3d7db" />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity style={styles.button} onPress={() => { loginUser(data.email, data.password) }}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('PasswordResetScreen') }}>
                            <Text style={{ color: '#d3d7db' }}>Forgot Your Password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 170 }}>
                        <Text style={{ color: '#d3d7db' }}>Don't Have an Account?</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('RegisterScreen') }}>
                            <Text style={styles.buttonText}>Register Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>
        </View>
    )
}

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: height_logo,
        height: height_logo,
    },
    header: {
        flex: 1,
        marginTop: 60
    },
    footer: {
        flex: 2,
        alignItems: 'center'
    },
    textInput: {
        fontSize: 17,
        flex: 1,
        height: 40,
        borderColor: "white",
        color: "white",
    },
    input: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: "#d3d7db",
        width: 350
    },
    button: {
        width: 350,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#d3d7db'
    },
    buttonText: {
        color: '#d3d7db',
        fontWeight: 'bold',
        fontSize: 17
    }
});

export default SplashScreen;