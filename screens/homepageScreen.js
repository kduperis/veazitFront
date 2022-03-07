import { useState, useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';

import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import AsyncStorage from '@react-native-async-storage/async-storage';

import themeContext from '../config/themeContext';

export default function HomepageScreen(props) {

  const theme = useContext(themeContext);

  const [pseudo, setPseudo] = useState('');

  const dispatch = useDispatch();



  useEffect(() => {
    /* AsyncStorage.getItem('pseudo', function (error, pseudo) {
      if (pseudo) {
        AsyncStorage.getItem('token', function (error, token) {
          if (token) {
            dispatch({ type: 'addToken', token: token })
          }
        });
        props.navigation.navigate('StackNavigation')
      }
    }); */
  }, []);

  let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });

  if (!fontLoaded) {
    return <AppLoading />
  }
  return (
    <View style={[styles.container,{backgroundColor: theme.background}]}>
      <Text style={{ color: theme.color, fontSize: 50, fontFamily: "PressStart2P_400Regular" }}>Veazit</Text>
      <Text style={{ color: "#D1D8E0", fontSize: 50, fontFamily: "PressStart2P_400Regular" }}>&</Text>
      <Text style={{ color: theme.color, fontSize: 50, marginBottom: 50, fontFamily: "PressStart2P_400Regular" }}>Play</Text>

      <SafeAreaView>
        <Input
          onChangeText={(val) => setPseudo(val)}
          value={pseudo}
          containerStyle={{ width: 275 }}
          inputStyle={{ marginLeft: 10, color: '#fff' }}
          placeholder='Entrez votre nom'
          leftIcon={
            <Icon
              name='user-astronaut'
              size={24}
              color={theme.color}
            />
          }
        />
      </SafeAreaView>

      <TouchableOpacity 
        style={[styles.button,{borderColor: theme.color}]}
        onPress={() => { AsyncStorage.setItem("pseudo", pseudo), props.navigation.navigate("HomeFilter") }}>
          <Text
            style={[styles.buttonText,{color: theme.color}]}>Start</Text>
      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  button: {
    width: '50%',
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent:'center',
    alignItems:'center',
    marginVertical:25,
  },
  buttonText: {
    fontFamily: "PressStart2P_400Regular",
    fontSize: 20,
  },

});
