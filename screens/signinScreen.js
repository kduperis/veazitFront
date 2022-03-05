import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {PressStart2P_400Regular} from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { IP_URL } from '@env'

export default function SignIn(props) {

    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    const [listErrorsSignin, setErrorsSignin] = useState([]);

    const dispatch = useDispatch();

    var handleSubmitSignin = async () => {

        const data = await fetch(`http://${IP_URL}:3000/users/sign-in`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
        })

        const body = await data.json()

        if (body.result == true) {
            dispatch({ type: 'addToken', token: body.user.token })
            AsyncStorage.setItem("token", body.user.token)
            props.navigation.navigate('StackNavigation', { screen: 'Map' });
        } else {
            setErrorsSignin(body.error)
        }
    }

    var tabErrorsSignin = listErrorsSignin.map((error, i) => {
        return (<Text key={i} style={styles.error}>{error}</Text>)
    })

    //Mise en place de la Font Press Start 2P ATTENTION - A DÉCLARER JUSTE AVANT LE RETURN DE LA FONCTION
    let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });
    if (!fontLoaded) {
        return <AppLoading />
    }

    return (
        <View style={styles.container}>
            <Text h2 style={{ color: '#FFFFFF', fontSize: 25, fontFamily: 'PressStart2P_400Regular' }}>Welcome back</Text>
            <Text h2 style={{ marginBottom: 25, color: '#06D4B6', fontSize: 25, fontFamily: 'PressStart2P_400Regular' }}>Veaziter</Text>
            <Input
                onChangeText={(e) => setSignInEmail(e)}
                value={signInEmail}
                containerStyle={{ marginBottom: 15, width: '70%' }}
                inputStyle={{ marginLeft: 10, color: '#fff' }}
                placeholder='Email'
                leftIcon={
                    <Icon
                        name='at'
                        size={24}
                        color='#06D4B6'
                    />
                }
            />
            <Input
                onChangeText={(e) => setSignInPassword(e)}
                value={signInPassword}
                containerStyle={{ marginBottom: 15, width: '70%' }}
                inputStyle={{ marginLeft: 10, color: '#fff' }}
                placeholder='Mot de passe'
                secureTextEntry={true}
                leftIcon={
                    <Icon
                        name='key'
                        size={24}
                        color='#06D4B6'
                    />
                }
            />

            {tabErrorsSignin}

        
            <Button
                title={`Let's Veazit`}
                containerStyle={{
                  width: '70%',
                  marginHorizontal: 50, 
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: '#06D4B6',
                }}
                buttonStyle={{
                    backgroundColor:"#2C3A47",
                    height:50,
                }}
                titleStyle={{
                    fontFamily: "PressStart2P_400Regular",
                    fontSize: 20,
                    color: "#06D4B6",
                }}
                onPress={() => handleSubmitSignin()}
              />

            <View style={{flexDirection: 'row', width: '70%', marginVertical:20}}>
                <View style={{backgroundColor: '#A1A1A1', height: 1,flex:1,alignSelf: 'center' }} />
                <Text style={{ alignSelf:'center', paddingHorizontal:10, fontSize: 20, color:'#06D4B6' }}>OU</Text>
                <View style={{backgroundColor: '#A1A1A1', height: 1,flex:1, alignSelf: 'center' }} />
            </View>

            <Button
                title={`Sign in`}
                icon={{
                    name: 'google',
                    type: 'font-awesome',
                    size: 22,
                    color: 'white',
                    marginRight: 20,
                }}
                containerStyle={{
                    width:'70%',
                    
                    borderRadius: 30,
                    borderWidth: 1,
                    borderColor: '#EA4335',
                }}
                buttonStyle={{
                    backgroundColor:"#EA4335",
                    height:50,
                }}
                titleStyle={{
                    fontFamily: "PressStart2P_400Regular",
                    fontSize: 20,
                    color: "#FFF",
                }}
                
            />

            

            

            {/*Redirection vers la page SIGN IN si l'USER possède un compte*/}
            <Text style={styles.text}>Vous n’avez pas de compte ?</Text>
            <Text style={styles.textConnect} onPress={() => props.navigation.navigate('SignUp')}>Inscrivez-vous</Text>
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
    error: {
        color: 'red',
        marginBottom:15
    },
    text: {
        marginTop: 30,
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textConnect: {
        color: '#06D4B6',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "PressStart2P_400Regular",
        marginTop: 10,
        textDecorationLine: 'underline'
    },

})
