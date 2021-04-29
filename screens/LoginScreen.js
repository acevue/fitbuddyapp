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
//import Fitness from '@ovalmoney/react-native-fitness';
import GoogleFit, { Scopes } from 'react-native-google-fit'

const LoginScreen = ({ navigation }) => {



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

  //TODO
  const _handleMore = () => {
    alert("TODO: Options...")
  }

  //TODO
  const _handleSearch = () => {
    alert("TODO: Search for users...")
  }

  var broly = 0;
  const firestoreRef = firestore().collection('Users/' + auth().currentUser.uid + '/Status');
  const afd = storage();
  const joref = storage().ref('/images/rockLifting.jpg');
  var storageRef = storage.reference;


  var jo = 0;

  const bloz = ['okay', 'brazy', 'dude'];
  const { user } = React.useContext(AuthContext);

  const [data, setData] = React.useState({
    modalVisible: false,
    modelImage: require('../images/therock.jpg'),
    images: [
      require('../images/therock.jpg')
    ],
    status: '',
    status: '',
    comments: [],
    isLoading: true,
    joCounter: 0
  });


  useEffect(() => {
    data.comments = [];
    return firestoreRef.orderBy('time', 'asc').onSnapshot(querySnapshot => {
      var doogie = 0;
      querySnapshot.forEach(doc => {
        doogie++;
        const time1 = doc.data()['time'];
        const type1 = doc.data()['type'];
        const status1 = doc.data()['status'];
        const brudda = { time: time1, type: type1, status: status1 };
        if (type1 === 'photo') {

        }
        data.comments.unshift(
          brudda
        );
      });
      if (data.isLoading === true) {
        console.log("The thing is true rn: " + broly);
        broly++;
        console.log("The thing is true rn: " + broly);
        setLoader(false);
      }
    });
  }, [data.isLoading]);


  const grabMedia = () => {
    console.log(afd);
    afd.ref('images').putFile('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F822821794398992113%2F&psig=AOvVaw0S27u-NNxG-70IxTXSIEI3&ust=1593518905992000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKC13NT-puoCFQAAAAAdAAAAABAD');
  }

  const isLoadingChange = (stated) => {
    setData({
      ...data,
      isLoading: stated
    })
  }


  const statusUpdateChange = (statusText) => {
    setData({
      ...data,
      status: statusText
    })
  }

  const setModalVisible = (visible) => {
    setData({
      ...data,
      modalVisible: visible,
    })
  }

  const setLoader = (place) => {
    setData({
      ...data,
      isLoading: place,
    })
    console.log("tis is itthe state is: " + data.isLoading);
  }

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  const postStatus = (statusText, typeOfFile) => {
    console.log("anotha one");
    const bob = 'Users/' + auth().currentUser.uid + '/Status';
    console.log(bob);
    firestore()
      .collection(bob)
      .add({
        status: statusText,
        type: typeOfFile,
        time: firestore.Timestamp.now()
      })
      .then(() => {
        console.log('Status Updated');
        data.joCounter = 1;
        console.log("just set it rn");

        console.log("about to");
        grabMedia();
        setLoader(true);
      });
  }

  //Fitness features
  //TODO:

  const steps = () => {
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
          alert("AUTH_SUCCESS");
          const opt = {
            startDate: "2021-04-29T00:00:17.107Z", // required ISO8601Timestamp
            endDate: new Date().toISOString(), // required ISO8601Timestamp
            bucketUnit: "Hourly", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
            bucketInterval: 1, // optional - default 1. 
          };

          GoogleFit.getDailyStepCountSamples(opt)
            .then((res) => {
              const str1 = 'Hourly Steps >>>' + JSON.stringify(res);
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

  const height = () => {
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
            startDate: "2017-01-01T00:00:17.971Z", // required
            endDate: new Date().toISOString(), // required
          };

          GoogleFit.getHeightSamples(opt).then((res) => {
            const str1 = 'Height ( In Meters) >>>' + JSON.stringify(res);
            alert(str1);
          });

        } else {
          alert("AUTH_DENIED", authResult.message);
        }
      })
      .catch(() => {
        alert("AUTH_ERROR");
      })



  }

  const weight = () => {
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
            unit: "pound", // required; default 'kg'
            startDate: "2017-01-01T00:00:17.971Z", // required
            endDate: new Date().toISOString(), // required
            bucketUnit: "DAY", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
            bucketInterval: 1, // optional - default 1. 
            ascending: false // optional; default false
          };

          GoogleFit.getWeightSamples(opt).then((res) => {
            const str1 = 'Current Weight (lbs) >>>' + JSON.stringify(res);
            alert(str1);
          });

        } else {
          alert("AUTH_DENIED", authResult.message);
        }
      })
      .catch(() => {
        alert("AUTH_ERROR");
      })
  }

  const calories = () => {
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
            startDate: "2021-04-29T00:00:17.107Z", // required
            endDate: new Date().toISOString(), // required
            basalCalculation: true, // optional, to calculate or not basalAVG over the week
            bucketUnit: "DAY", // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
            bucketInterval: 1, // optional - default 1. 
          };

          GoogleFit.getDailyCalorieSamples(opt).then((res) => {
            const str1 = 'Calories (Burned) >>>' + JSON.stringify(res);
            alert(str1);
          });

        } else {
          alert("AUTH_DENIED", authResult.message);
        }
      })
      .catch(() => {
        alert("AUTH_ERROR");
      })
  }

  if (data.isLoading === true) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Appbar.Header style={{ backgroundColor: '#00cc99' }}>
        <Appbar.Content title="FitBuddy" subtitle="" />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      </Appbar.Header>

      <TouchableOpacity onPress={() => steps()}>
        <Text style={{ marginLeft: 5, borderRadius: 5, padding: 5, backgroundColor: '#9bd494' }}>Check Daily Steps</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => calories()}>
        <Text style={{ marginLeft: 5, borderRadius: 5, padding: 5, backgroundColor: '#9bd494' }}>Check Daily Calories</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => height()}>
        <Text style={{ marginLeft: 5, borderRadius: 5, padding: 5, backgroundColor: '#9bd494' }}>Obtain Height</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => weight()}>
        <Text style={{ marginLeft: 5, borderRadius: 5, padding: 5, backgroundColor: '#9bd494' }}>Obtain Weight</Text>
      </TouchableOpacity>

      <Text style={{ marginLeft: 5, borderRadius: 5, padding: 5, backgroundColor: '#9bd494' }}>TODO: Check Blood Pressure</Text>

      <Text style={{ marginLeft: 5, borderRadius: 5, padding: 5, backgroundColor: '#9bd494' }}>TODO: Check Heart Rate</Text>

      <Text style={{ marginLeft: 5, borderRadius: 5, padding: 5, backgroundColor: '#9bd494' }}>TODO: Check Daily Nutrition Intake</Text>

      <Text style={{ marginLeft: 5, borderRadius: 5, padding: 5, backgroundColor: '#9bd494' }}>TODO: Check Hydration Intake</Text>

      <Text style={{ marginLeft: 5, borderRadius: 5, padding: 5, backgroundColor: '#9bd494' }}>TODO: Google Fit</Text>

      <View style={styles.avatar}>
        {imageSource === null ? (
          <Avatar
            source={require('../images/profile_pic.jpg')}
            rounded
            size={180}
            interactive
            onPress={selectImage}
          />
        ) : (
          <Avatar
            source={{ uri: imageSource }}
            rounded
            size={180}
            interactive
            onPress={selectImage}
          />
        )}

        <Text style={styles.name}>John Doe</Text>
      </View>
      <View style={styles.followers}>
        <Text style={{ flex: 1, paddingLeft: 25 }}>150 Followers</Text>
        <Text style={{ paddingRight: 25 }}>200 Following</Text>
      </View>
      <View style={styles.footer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TextInput
            multiline={true}
            placeholder="Say something..."
            style={{ marginVertical: 10, borderBottomWidth: 1, width: 350 }}
            onChangeText={(val) => statusUpdateChange(val)}
          />
          <TouchableOpacity
            onPress={() => postStatus(data.status, 'photo')}
          >
            <Text style={{ marginLeft: 5, borderRadius: 5, padding: 5, backgroundColor: '#9bd494' }}>Post</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.activityList}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              {data.comments.map((item, key) => (
                <Text key={key}> { item.status}</Text>)
              )}
            </View>
          </View>
          <View style={styles.activityList}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <MaterialIcon name="human-handsup" size={24} color="#00aae3" />
            </View>
            <View style={{ flex: 7, justifyContent: 'center' }}>
              <Text> Goal: Lift 3 weeks in a row met!</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
              <TouchableOpacity>
                <MaterialIcon name="delete" size={25} color="#abb3a8" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.activityList}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <MaterialIcon name="map-marker" size={24} color="#61c92c" />
            </View>
            <View style={{ flex: 7, justifyContent: 'center' }}>
              <Text>Checked in at Planet Fitness on Greenfield !</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
              <TouchableOpacity>
                <MaterialIcon name="delete" size={25} color="#abb3a8" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.activityList}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <MaterialIcon name="star-circle" size={24} color="#e2ed45" />
            </View>
            <View style={{ flex: 7, justifyContent: 'center' }}>
              <Text>Lost 5 lbs!</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
              <TouchableOpacity>
                <MaterialIcon name="delete" size={25} color="#abb3a8" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.activityList}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <MaterialIcon name="map-marker" size={24} color="#61c92c" />
            </View>
            <View style={{ flex: 7, justifyContent: 'center' }}>
              <Text>Checked in at Planet Fitness on Greenfield!</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
              <TouchableOpacity>
                <MaterialIcon name="delete" size={25} color="#abb3a8" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.activityList}>
            <View style={{ flex: 7, justifyContent: 'center' }}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image source={require('../images/rockLifting.jpg')}></Image>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
              <TouchableOpacity>
                <MaterialIcon name="delete" size={25} color="#abb3a8" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.activityList}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <MaterialIcon name="map-marker" size={24} color="#61c92c" />
            </View>
            <View style={{ flex: 7, justifyContent: 'center' }}>
              <Text>Checked in at Planet Fitness on Greenfield !</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
              <TouchableOpacity>
                <MaterialIcon name="delete" size={25} color="#abb3a8" />
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
        <View style={{ marginTop: 10, marginBottom: 5 }}>
          {<Button
            title='signout'
            onPress={() => signOut()}
          />}
        </View>
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
export default LoginScreen;