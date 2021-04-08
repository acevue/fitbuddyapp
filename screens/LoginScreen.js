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


const LoginScreen = ({ navigator }) => {

  //Added. 4/8/21
  //Need to show more to edit options for the app.
  const _handleMore = () => console.log('Shown more');


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




  // useEffect(() => {
  //   setTimeout(async() => {
  //     try {
  //       firestoreRef.onSnapshot(querySnapshot => {
  //     querySnapshot.forEach(doc => {
  //       console.log("hello bob: " + doc.data()['status']);
  //       const time1= doc.data()['time'];
  //       const type1= doc.data()['type'];
  //       const status1= doc.data()['status'];
  //       const brudda = {time: time1, type: type1, status: status1};
  //       data.comments.push(
  //         brudda
  //       );
  //       const jinx = [];
  //       const dawg = {name: 'bob', title:'dj'};
  //       jinx.push(dawg);
  //       console.log("this is the object:" + jinx + "here it is: " + jinx[0]['name']);
  //       console.log("this is the comment data: " +data.comments);
  //       isLoadingChange();
  //     });
  //   });
  //     } catch (e) {
  //       // saving error
  //       console.log(e);
  //     }
  //   }, 10000);
  // }, []);

  useEffect(() => {
    data.comments = [];
    return firestoreRef.orderBy('time', 'asc').onSnapshot(querySnapshot => {
      var doogie = 0;
      querySnapshot.forEach(doc => {
        doogie++;
        // console.log("new query:" + doogie+" : "+data.isLoading);
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


  // const dawggy = () => {
  //   const bob = 'Users/'+auth().currentUser.uid+'/Status';
  //   firestore()
  //   .collection(bob)
  //   .orderBy('time','desc')
  //   .get()
  //   .then(querySnapshot => {
  //     if(data.joCounter===0){
  //       while(jo<querySnapshot._docs.length){
  //         data.comments.push(querySnapshot._docs[jo]._data.status);
  //         console.log("this is jo counter: "+jo);
  //         jo++;
  //       }
  //     }
  //     else{
  //       data.comments.unshift(querySnapshot._docs[0]._data.status);
  //     }
  //     setData({
  //       ...data,
  //       isLoading: false
  //     })
  //   });
  // }

  // const reference = firebase.storage().ref('black-t-shirt-sm.png');


  const updateProfile = () => {
    console.log("TODO: Update Profile Picture")
  }

  const grabMedia = () => {
    console.log(afd);
    afd.ref('images').putFile('https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F822821794398992113%2F&psig=AOvVaw0S27u-NNxG-70IxTXSIEI3&ust=1593518905992000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKC13NT-puoCFQAAAAAdAAAAABAD');
    // const pathToFile = 'images\rockLifting.jpg';
    // joref.putFile(pathToFile);
    // const url = storage().getDownloadURL();
    // console.log(url);

    // console.log("okay ryin right now photo grabbing");
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
        // if(data.isLoading===true){
        //   console.log('wow breah doing it rn.');
        //   setLoader(true);

        // }
        console.log("just set it rn");

        console.log("about to");
        grabMedia();
        setLoader(true);
      });
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
      <Modal
        style={styles.container}
        animationType={'fade'}
        transparent={true}
        visible={data.modalVisible}
        onRequestClose={() => { }}
      >
        <View style={styles.modal}>
          <Text style={{ color: 'white' }} onPress={() => setModalVisible(false)}>
            Close
        </Text>
          <ReactNativeZoomableView
            maxZoom={1.5}
            minZoom={0.5}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
          >
            <Image style={styles.breh} resizeMode='contain' source={require('../images/rockLifting.jpg')}></Image>
          </ReactNativeZoomableView>
        </View>
      </Modal>
      <View style={styles.header}>

        <View style={styles.wallpaper}>
          <Image
          //TODO:
          //style={styles.wallpaperImage}
          //source={require('../images/wallpaper.jpg')}
          //resizeMode='cover'
          />
        </View>
      </View >
      <View style={styles.midSection}>
        <View style={styles.avatar}>
          <View style={{ marginBottom: 8 }}>
            <Avatar
              source={require('../images/profile_pic.jpg')}
              rounded
              size={180}
              onPress={() => alert("working")}
            />
          </View>

          <Text style={styles.name}>John Doe</Text>
          <View style={styles.followers}>
            <Text style={{ flex: 1, paddingLeft: 25 }}>150 Followers</Text>
            <Text style={{ paddingRight: 25 }}>200 Following</Text>
          </View>
        </View>
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
          // onPress={() => grabStatus()}
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
              {/* <Text>{data.comments[0]['status']}</Text>
                <Text>{data.comments[0]['time'].toDate().toString()}</Text> */}
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
    marginTop: -200
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