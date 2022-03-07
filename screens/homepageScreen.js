import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomepageScreen(props) {

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

      <TouchableOpacity 
        style={styles.button}
        onPress={() => { AsyncStorage.setItem("pseudo", pseudo), props.navigation.navigate("HomeFilter") }}>
          <Text
            style={styles.buttonText}>Start</Text>
      </TouchableOpacity>

      <Button
        title={`Start`}
        containerStyle={{
          width: '50%',
          marginHorizontal: 50,
          borderRadius: 30,
          borderWidth: 1,
          borderColor: '#06D4B6',
        }}
        buttonStyle={{
          backgroundColor: "#2C3A47",
          height: 50,
        }}
        titleStyle={{
          fontFamily: "PressStart2P_400Regular",
          fontSize: 20,
          color: "#06D4B6",
        }}
        onPress={() => { AsyncStorage.setItem("pseudo", pseudo), props.navigation.navigate("HomeFilter") }}
      />

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
    width: '50%',
    height: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#06D4B6',
    justifyContent:'center',
    alignItems:'center',
  },
  buttonText: {
    fontFamily: "PressStart2P_400Regular",
    fontSize: 20,
    color: "#06D4B6",
  },

});
