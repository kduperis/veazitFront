import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import {
  PressStart2P_400Regular
} from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function homepageScreen(props) {
  const [pseudo, setPseudo] = useState('');
  const [pseudoIsSubmited, setPseudoIsSubmited] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('pseudo', function (error, pseudo) {
      if (pseudo) {
        props.navigation.navigate('StackNavigation')
      }
    });
  }, []);

  var inputPseudo;
  if (!pseudoIsSubmited) {
    inputPseudo = <SafeAreaView>
      <TextInput style={styles.input} placeholder='Entrez votre nom' onChangeText={(val) => setPseudo(val)} />
    </SafeAreaView>

  } else {
    inputPseudo = <Text h4 style={{ marginBottom: 25, color: '#FFFFFF', fontSize: 20 }}>Welcome back {pseudo}</Text>
  }


  let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });

  if (!fontLoaded) {
    return <AppLoading />
  }
  return (
    <View style={styles.container}>
      <Text style={{ color: "#06D4B6", fontSize: 50, fontFamily: "PressStart2P_400Regular" }}>Veazit</Text>
      <Text style={{ color: "#D1D8E0", fontSize: 50, fontFamily: "PressStart2P_400Regular" }}>&</Text>
      <Text style={{ color: "#06D4B6", fontSize: 50, marginBottom: 50, fontFamily: "PressStart2P_400Regular" }}>Play</Text>

      {inputPseudo}

      <TouchableOpacity onPress={() => { AsyncStorage.setItem("pseudo", pseudo), props.navigation.navigate("HomeFilter") }} >
        <View style={styles.button}>
          <Text style={styles.buttonText} >START</Text>
        </View>
      </TouchableOpacity>
    </View >

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
