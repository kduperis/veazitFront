import { StyleSheet, View } from 'react-native';
import { Text, CheckBox } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import {
  PressStart2P_400Regular
} from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';


export default function homefilterScreen(props) {


  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);

  const checked = useSelector((state) => state.category)

  var filter = ["aquatique", "Domaine", "Parc", "category 4"]

  useEffect(() => {
    function checkB(allCategory, selected) {
      for (var i = 0; i < selected.length; i++) {

        switch (allCategory.indexOf(selected[i])) {
          case 0:
            setCheck1(true);
            break;
          case 1:
            setCheck2(true);
            break;
          case 2:
            setCheck3(true);
            break;
          case 3:
            setCheck4(true);
            break;
        }
      }
    }
    checkB(filter, checked)
  }, [])

  let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });

  if (!fontLoaded) {
    return <AppLoading />
  }
  return (

    <View style={styles.container}>
      <Text style={{ color: "#06D4B6", fontSize: 15, fontFamily: "PressStart2P_400Regular", marginBottom: 80 }}>Modifiez vos genres de lieu ici : </Text>

      <CheckBox
        center
        title="Aquatique"
        checked={check1}
        checkedColor="#06D4B6"
        onPress={() => setCheck1(!check1)}
      />

      <CheckBox
        center
        title="Domaine"
        checked={check2}
        checkedColor="#06D4B6"
        onPress={() => setCheck2(!check2)}
      />

      <CheckBox
        center
        title="Parc"
        checked={check3}
        checkedColor="#06D4B6"
        onPress={() => setCheck3(!check3)}
      />

      <CheckBox
        center
        title="category 4"
        checked={check4}
        checkedColor="#06D4B6"
        onPress={() => setCheck4(!check4)}
      />

      <TouchableOpacity onPress={() => props.navigation.navigate('Map')}>
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
