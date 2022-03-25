import { useState,useContext } from 'react';
import { useDispatch } from 'react-redux';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {PressStart2P_400Regular} from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Google from 'expo-google-app-auth';

import { IP_URL } from '@env'

import themeContext from '../config/themeContext';

export default function SignIn(props) {

    const theme = useContext(themeContext);

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

    
    var handleGoogleSignin = async () => {
        const config = {
            iosClientId:'847688372567-4kjumpe2p0itpt10dbp0a3fpo8uvp6ru.apps.googleusercontent.com',
            androidClientId: '847688372567-t2vo8pfml6bthegn1hd7r7hto8b3g2hv.apps.googleusercontent.com',
            scopes: ['profile','email']};

            const { type, accessToken, user } = await Google.logInAsync(config)
            if(type ==='success'){
                const {email,name,photoUrl} = user;

                const data = await fetch(`http://${IP_URL}:3000/users/google-connect`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `email=${email}&photoUrl=${photoUrl}&name=${name}`
                })

                const body = await data.json()
                if(body.result){
                    console.log(body.infoConnect)
                    dispatch({ type: 'addToken', token: body.user.token })
                    AsyncStorage.setItem("token", body.user.token)
                    setTimeout(()=>props.navigation.navigate('StackNavigation', { screen: 'Map' },1000))
                }else{
                    setErrorsSignin(body.error)
                }
            }else{
                console.log('Google signin was cancelled');
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
        <View style={[styles.container,{backgroundColor: theme.background}]}>
            <Text h2 style={{ color: '#FFFFFF', fontSize: 25, fontFamily: 'PressStart2P_400Regular' }}>Welcome back</Text>
            <Text h2 style={{ marginBottom: 25, color: theme.color, fontSize: 25, fontFamily: 'PressStart2P_400Regular' }}>Veaziter</Text>
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
                        color={theme.color}
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
                        color={theme.color}
                    />
                }
            />

            {tabErrorsSignin}

            
            <TouchableOpacity 
                style={[styles.button,{borderColor: theme.color}]}
                onPress={() => handleSubmitSignin()}>
                <Text
                    style={[styles.buttonText,{color: theme.color}]}>Let's Veazit</Text>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', width: '70%', marginVertical:20}}>
                <View style={{backgroundColor: '#A1A1A1', height: 1,flex:1,alignSelf: 'center' }} />
                <Text style={{ alignSelf:'center', paddingHorizontal:10, fontSize: 20, color:theme.color }}>OU</Text>
                <View style={{backgroundColor: '#A1A1A1', height: 1,flex:1, alignSelf: 'center' }} />
            </View>

            <TouchableOpacity 
                style={styles.buttonGoogle}
                onPress={()=>handleGoogleSignin()}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Icon name='google' size={22} color='white'/>
                        <Text style={styles.buttonTextGoogle}>Connexion</Text>
                    </View>
            </TouchableOpacity>

            {/*Redirection vers la page SIGN IN si l'USER possède un compte*/}
            <Text style={styles.text}>Vous n’avez pas de compte ?</Text>
            <Text style={[styles.textConnect,{color: theme.color}]} onPress={() => props.navigation.navigate('SignUp')}>Inscrivez-vous</Text>
        </View >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontFamily: "PressStart2P_400Regular",
        fontSize:12
    },
    textConnect: {
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "PressStart2P_400Regular",
        marginTop: 10,
        textDecorationLine: 'underline'
    },
    button: {
        width: '70%',
        height: 50,
        borderRadius: 30,
        borderWidth: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    buttonText: {
        fontFamily: "PressStart2P_400Regular",
        fontSize: 20,
    },
    buttonGoogle: {
        backgroundColor:'#EA4335',
        width: '70%',
        height: 50,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#EA4335',
        justifyContent:'center',
        alignItems:'center',
    },
    buttonTextGoogle: {
        marginLeft:15,
        fontFamily: "PressStart2P_400Regular",
        fontSize: 20,
        color: "white",
    },

})
