import React from 'react';
import { TextInput, Text, View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';



const RegisterScreen = () => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        confirmPassword: '',
        textChange: false,
        secureTextEntry: true,
        confirmSecureTextEntry: true
    });

    const toggleSecureText = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const toggleConfirmSecureText = () => {
        setData({
            ...data,
            confirmSecureTextEntry: !data.confirmSecureTextEntry
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
    const confirmPasswordInputChange = (val) => {
        setData({
            ...data,
            confirmPassword: val
        });
    }

    const registerUser = (userEmail, userPassword, userConfirmPassword) => {
        if (userPassword !== userConfirmPassword) {
            alert('Your passwords do not match.');
        }
        else if ((userConfirmPassword || userPassword || userEmail) === '') {
            alert('Invalid inputs! Please Enter valid email and password.');
        }
        else {
            auth()
                .createUserWithEmailAndPassword(userEmail, userPassword)
                .then(() => {
                    console.log('User added!');
                    auth()
                        .signInWithEmailAndPassword(userEmail, userPassword)
                        .then(() => {
                            console.log('User Logged In');
                        })
                        .catch(error => {

                            console.error(error);
                        });


                    setTimeout(() => {
                        firestore()
                            .collection('Users')
                            .doc(auth().currentUser.uid)
                            .set({
                                email: userEmail,
                                uuid: auth().currentUser.uid
                            })
                            .then(() => {
                                console.log('User added just fine!');
                            });
                    }, 10000);
                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        alert('That email address is already in use!');
                    }

                    else if (error.code === 'auth/invalid-email') {
                        alert('That email address is invalid!');
                    }
                    else {
                        console.error(error);
                    }
                });


        }
    }


    return (
        <View style={styles.container}>
            <LinearGradient colors={['#1fcc87', '#0d6ad4']} style={styles.linearGradient}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Register</Text>
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
                            ref={this.myPasswordInput}
                        />
                        <TouchableOpacity onPress={() => toggleSecureText()}>
                            {data.secureTextEntry ?
                                <MaterialIcon name="eye-off" size={25} color="#d3d7db" />
                                :
                                <MaterialIcon name="eye" size={25} color="#d3d7db" />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.input, { marginTop: 20, marginLeft: -4 }]}>
                        <MaterialIcon name="lock-outline" size={30} color="#d3d7db" style={styles.icon} />
                        <TextInput
                            placeholder="Confirm Password"
                            placeholderTextColor="#d3d7db"
                            style={styles.textInput}
                            autoCapitalize='none'
                            secureTextEntry={data.confirmSecureTextEntry}
                            onChangeText={(val) => confirmPasswordInputChange(val)}
                        />
                        <TouchableOpacity onPress={() => toggleConfirmSecureText()}>
                            {data.confirmSecureTextEntry ?
                                <MaterialIcon name="eye-off" size={25} color="#d3d7db" />
                                :
                                <MaterialIcon name="eye" size={25} color="#d3d7db" />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity style={styles.button} onPress={() => { registerUser(data.email, data.password, data.confirmPassword) }}>
                            <Text style={styles.buttonText}>Create My Account</Text>
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

export default RegisterScreen;