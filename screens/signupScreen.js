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

export default function SignupScreen(props) {

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

    var tabErrorsSignup = listErrorsSignup.map((error, i) => {
        return (<Text key={i} style={styles.error}>{error}</Text>)
    })

    //Mise en place de la Font Press Start 2P ATTENTION - A DÉCLARER JUSTE AVANT LE RETURN DE LA FONCTION
    let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });
    if (!fontLoaded) {
        return <AppLoading />
    }

    return (
        <View style={styles.container}>

            {/*Bouton previous*/}
            <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.touchable} onPress={() => props.navigation.navigate('StackNavigation', { screen: 'Map' })}>
                <View style={styles.buttonPrevious}>
                <Icon
                        name='arrow-left'
                        size={24}
                        color='#06D4B6'
                    />
                </View>
            </TouchableOpacity>
            </View>


            {/*Titre*/}
            <Text h2 style={{ color: '#FFFFFF', fontSize: 25, fontFamily: 'PressStart2P_400Regular' }}>Welcome new</Text>
            <Text h2 style={{ marginBottom: 15, color: '#06D4B6', fontSize: 25, fontFamily: 'PressStart2P_400Regular' }}>Veaziter</Text>

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
                        color='#06D4B6'
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
                        color='#06D4B6'
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
                        color='#06D4B6'
                    />
                }
            />

            {tabErrorsSignup}

            {/*Bouton qui redirige vers le 'JEU'*/}
            <Button
                title={`Start`}
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
                onPress={() => handleSubmitSignup()}
              />

            {/*Redirection vers la page SIGN IN si l'USER possède un compte*/}
            <Text style={styles.text}>Vous avez un compte ?</Text>
            <Text style={styles.textConnect} onPress={() => props.navigation.navigate('SignIn')}>Connectez-vous</Text>
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
    error: {
        color: 'red',
        marginBottom: 15,
    },
    buttonPrevious: {
        backgroundColor: "#2C3A47",
        borderWidth: 1,
        borderColor: "#06D4B6",
        borderRadius: 10,
        padding:10,

    },
    buttonContainer:{
        position:'absolute',
        bottom:50,
        left:30,
        flexDirection:'row'
    },
});
