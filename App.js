
import 'react-native-gesture-handler';
import React, { useEffect, useState , Button} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/LoginScreen'


import { Text, View } from 'react-native';
import RootStackScreen from './screens/RootStackScreen';
import auth from '@react-native-firebase/auth';
import { AuthContext } from './components/context';
import RootDrawerScreen from './screens/RootDrawerScreen';



const App = () => {

  // Set an initializing state whilst Firebase connects
const [initializing, setInitializing] = useState(true);
const [user, setUser] = useState();

// Handle user state changes
const onAuthStateChanged = (user) => {
  setUser(user);
  if (initializing) setInitializing(false);
}

useEffect(() => {
  const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  return subscriber; // unsubscribe on unmount
}, []);



  return(
    <AuthContext.Provider value={user}>
      <NavigationContainer>
      { user ?
        <RootDrawerScreen/>
      :
        <RootStackScreen/>
      }
    </NavigationContainer>
    </AuthContext.Provider>
  )
}

export default App;
