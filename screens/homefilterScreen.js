import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, CheckBox } from 'react-native-elements';

import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomefilterScreen(props) {

  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);

  const dispatch = useDispatch()


  const checkBox = () => {
    let category = [];
    if (check1) {
      category.push("aquatique")
    }
    if (check2) {
      category.push("Domaine")
    }
    if (check3) {
      category.push("Parc")
    }
    if (check4) {
      category.push("category 4")
    }

    AsyncStorage.setItem("category", JSON.stringify(category))
    dispatch({ type: "addchecked", category: category })
    props.navigation.navigate('TutoScreen')

  }


  let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });

  if (!fontLoaded) {
    return <AppLoading />
  }

  return (

    <View style={styles.container}>
      <Text style={{ color: "#06D4B6", fontSize: 15, fontFamily: "PressStart2P_400Regular", marginBottom: 80 }}>Quel(s) genre(s) de lieu souhaitez-vous Veaziter ?</Text>
      <View >
        <CheckBox

          title="Aquatique"
          checked={check1}
          checkedColor="#06D4B6"
          onPress={() => setCheck1(!check1)}


        />

        <CheckBox

          title="Domaine"
          checked={check2}
          checkedColor="#06D4B6"
          onPress={() => setCheck2(!check2)}
        />

        <CheckBox

          title="Parc"
          checked={check3}
          checkedColor="#06D4B6"
          onPress={() => setCheck3(!check3)}
        />

        <CheckBox

          title="category 4"
          checked={check4}
          checkedColor="#06D4B6"
          onPress={() => setCheck4(!check4)}
        />

      </View>


      <TouchableOpacity
        style={styles.button}
        onPress={() => checkBox()}>
        <Text
          style={styles.buttonText}>GO!</Text>
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
  button: {
    width: '50%',
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#06D4B6',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 25,
  },
  buttonText: {
    fontFamily: "PressStart2P_400Regular",
    fontSize: 20,
    color: "#06D4B6",
  },
});
