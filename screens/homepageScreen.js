import { StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import {
  PressStart2P_400Regular
} from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';


export default function homepageScreen(props) {

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
        <TextInput style={styles.input} placeholder='Entrez votre nom' />
      </SafeAreaView>
      <TouchableOpacity style={styles.touchable} onPress={() => props.navigation.navigate("HomeFilter")}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>START</Text>
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
    paddingTop: 30,
    borderRadius: 30


  },
  buttonText: {
    color: "#06D4B6",
    fontSize: 20,
    fontFamily: "PressStart2P_400Regular"
  },

});
