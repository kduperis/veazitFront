import { useState,useContext } from 'react';
import { useDispatch } from 'react-redux';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {PressStart2P_400Regular} from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import AsyncStorage from '@react-native-async-storage/async-storage';

import * as Google from 'expo-google-app-auth';

import { IP_URL } from '@env'

import themeContext from '../config/themeContext';

export default function SignupScreen(props) {

    const theme = useContext(themeContext);

    //Déclaration des constantes nécessaires pour création d'un nouveau User
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');

    const [listErrorsSignup, setErrorsSignup] = useState([])

    const dispatch = useDispatch();

    //Au clic sur le Bouton Start on va récupérer les INPUT
    var handleSubmitSignup = async () => {
    
        const data = await fetch(`http://${IP_URL}:3000/users/sign-up`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`
        })

        const body = await data.json()
        if (body.result == true) {
            dispatch({ type: 'addToken', token: body.saveUser.token })
            AsyncStorage.setItem("token", body.saveUser.token)
            props.navigation.navigate('StackNavigation', { screen: 'Map' });
        } else {
            setErrorsSignup(body.error)
        }
    };

    var handleGoogleSignup = async () => {
        const config = {
            iosClientId:'847688372567-4kjumpe2p0itpt10dbp0a3fpo8uvp6ru.apps.googleusercontent.com',
            androidClientId: '847688372567-t2vo8pfml6bthegn1hd7r7hto8b3g2hv.apps.googleusercontent.com',
            scopes: ['profile','email']};

            const { type, accessToken, user } = await Google.logInAsync(config)
            if(type ==='success'){
                const {email,name,photoUrl} = user;
                setTimeout(()=>props.navigation.navigate('StackNavigation', { screen: 'Map' },1000))
            }else{
                console.log('Google signin was cancelled');
        }
    }

    var tabErrorsSignup = listErrorsSignup.map((error, i) => {
        return (<Text key={i} style={styles.error}>{error}</Text>)
    })

    //Mise en place de la Font Press Start 2P ATTENTION - A DÉCLARER JUSTE AVANT LE RETURN DE LA FONCTION
    let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });
    if (!fontLoaded) {
        return <AppLoading />
    }

    return (
        <View style={[styles.container,{backgroundColor: theme.background}]}>

            {/*Bouton previous*/}
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.touchable} onPress={() => props.navigation.navigate('StackNavigation', { screen: 'Map' })}>
                <View style={[styles.buttonPrevious,{borderColor: theme.color}]}>
                    <Icon name='arrow-left' size={24} color={theme.color}/>
                </View>
            </TouchableOpacity>
            </View>


            {/*Titre*/}
            <Text h2 style={{ color: '#FFFFFF', fontSize: 25, fontFamily: 'PressStart2P_400Regular' }}>Welcome new</Text>
            <Text h2 style={{ marginBottom: 15, color: theme.color, fontSize: 25, fontFamily: 'PressStart2P_400Regular' }}>Veaziter</Text>

            <TouchableOpacity 
                style={styles.buttonGoogle}
                onPress={()=>handleGoogleSignup()}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                        <Icon name='google' size={22} color='white'/>
                        <Text style={styles.buttonTextGoogle}>Sign up</Text>
                    </View>
            </TouchableOpacity>

            <View style={{flexDirection: 'row', width: '70%', marginVertical:20}}>
                <View style={{backgroundColor: '#A1A1A1', height: 1,flex:1,alignSelf: 'center' }} />
                <Text style={{ alignSelf:'center', paddingHorizontal:10, fontSize: 20, color:theme.color }}>OU</Text>
                <View style={{backgroundColor: '#A1A1A1', height: 1,flex:1, alignSelf: 'center' }} />
            </View>
        
            {/*Input pour l'USERNAME'*/}
            <Input
                onChangeText={(e) => setSignUpUsername(e)}
                value={signUpUsername}
                containerStyle={{ marginBottom: 15, width: '70%' }}
                inputStyle={{ marginLeft: 10, color: '#fff' }}
                placeholder='Username'
                leftIcon={
                    <Icon
                        name='user-astronaut'
                        size={24}
                        color={theme.color}
                    />
                }
            />

            {/*Input pour l'EMAIL'*/}
            <Input
                onChangeText={(e) => setSignUpEmail(e)}
                value={signUpEmail}
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

            {/*Input pour le MOT DE PASSE*/}
            <Input
                onChangeText={(e) => setSignUpPassword(e)}
                value={signUpPassword}
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

            {tabErrorsSignup}

            {/*Bouton qui redirige vers le 'JEU'*/}
            <TouchableOpacity 
                style={[styles.button,{borderColor: theme.color}]}
                onPress={() => handleSubmitSignup()}>
                <Text
                    style={[styles.buttonText,{color: "#06D4B6"}]}>Start</Text>
            </TouchableOpacity>

            {/*Redirection vers la page SIGN IN si l'USER possède un compte*/}
            <Text style={styles.text}>Vous avez un compte ?</Text>
            <Text style={[styles.textConnect,{color: theme.color}]} onPress={() => props.navigation.navigate('SignIn')}>Connectez-vous</Text>
        </View >
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginTop: 30,
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textConnect: {
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "PressStart2P_400Regular",
        marginTop: 10,
        textDecorationLine: 'underline'
    },
    error: {
        color: 'red',
        marginBottom: 15,
    },
    buttonPrevious: {
        borderWidth: 1,
        borderRadius: 10,
        padding:10,
    },
    buttonContainer:{
        position:'absolute',
        bottom:50,
        left:30,
        flexDirection:'row'
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
});
