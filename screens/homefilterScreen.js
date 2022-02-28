import { StyleSheet, View } from 'react-native';
import { Button, Text, CheckBox, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { useState } from 'react';
import {
  PressStart2P_400Regular
} from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';


export default function homefilterScreen(props) {
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);

  let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });

  if (!fontLoaded) {
    return <AppLoading />
  }
  return (

    <View style={styles.container}>
      <Text style={{ color: "#06D4B6", fontSize: 15, fontFamily: "PressStart2P_400Regular", marginBottom: 80 }}>Quel(s) genre(s) de lieu souhaitez-vous Veaziter ?</Text>

      <CheckBox
        center
        title="Click Here"
        checked={check1}
        checkedColor="#06D4B6"
        onPress={() => setCheck1(!check1)}
      />

      <CheckBox
        center
        title="Click Here"
        checked={check2}
        checkedColor="#06D4B6"
        onPress={() => setCheck2(!check2)}
      />

      <CheckBox
        center
        title="Click Here"
        checked={check3}
        checkedColor="#06D4B6"
        onPress={() => setCheck3(!check3)}
      />

      <CheckBox
        center
        title="Click Here"
        checked={check4}
        checkedColor="#06D4B6"
        onPress={() => setCheck4(!check4)}
      />

      <TouchableOpacity onPress={() => props.navigation.navigate('StackNavigation')}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>GO!</Text>
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
  button: {
    backgroundColor: "#2C3A47",
    borderWidth: 1,
    borderColor: "#06D4B6",
    padding: 15,
    paddingTop: 25,
    borderRadius: 30,
    marginTop: 60

  },
  buttonText: {
    color: "#06D4B6",
    fontSize: 20,
    fontFamily: "PressStart2P_400Regular"
  },
});
