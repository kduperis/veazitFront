import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import {
  PressStart2P_400Regular
} from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useState, useEffect } from 'react';
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/FontAwesome5';

import { useDispatch } from 'react-redux';

export default function HomepageScreen(props) {

  const [pseudo, setPseudo] = useState('');

  const dispatch = useDispatch();

  /* useEffect(() => {
    AsyncStorage.getItem('pseudo', function (error, pseudo) {
      if (pseudo) {
        AsyncStorage.getItem('token', function (error, token) {
          if (token) {
            dispatch({ type: 'addToken', token: token })
          }
        }); 
        props.navigation.navigate('StackNavigation')
      }
    });

  }, []); */

  let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });

  if (!fontLoaded) {
    return <AppLoading />
  }
  return (
    <View style={styles.container}>
      <Text style={{ color: "#06D4B6", fontSize: 50, fontFamily: "PressStart2P_400Regular" }}>Veazit</Text>
      <Text style={{ color: "#D1D8E0", fontSize: 50, fontFamily: "PressStart2P_400Regular" }}>&</Text>
      <Text style={{ color: "#06D4B6", fontSize: 50, marginBottom: 50, fontFamily: "PressStart2P_400Regular" }}>Play</Text>

      <SafeAreaView>
      <Input
                onChangeText={(val) => setPseudo(val)}
                value={pseudo}
                containerStyle={{ marginBottom: 25, width: 275 }}
                inputStyle={{ marginLeft: 10, color: '#fff' }}
                placeholder='Entrez votre nom'
                leftIcon={
                    <Icon
                        name='user-astronaut'
                        size={24}
                        color='#06D4B6'
                    />
                }
            />
      </SafeAreaView>


      <TouchableOpacity onPress={() => { AsyncStorage.setItem("pseudo", pseudo), props.navigation.navigate("HomeFilter") }} >
        <View style={styles.button}>
          <Text style={styles.buttonText} >START</Text>
        </View>
      </TouchableOpacity>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C3A47',
    alignItems: 'center',
    justifyContent: 'center',

  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "#06D4B6",
    padding: 10,
    backgroundColor: "#D1D8E0",
    marginBottom: 50,
    width: 200
  },
  button: {
    backgroundColor: "#2C3A47",
    borderWidth: 1,
    borderColor: "#06D4B6",
    padding: 15,
    paddingTop: 25,
    borderRadius: 30
  },
  buttonText: {
    color: "#06D4B6",
    fontSize: 20,
    fontFamily: "PressStart2P_400Regular"
  },

});
