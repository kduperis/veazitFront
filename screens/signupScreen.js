import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome5';

import {
    PressStart2P_400Regular
} from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function signupScreen(props) {

    //Déclaration des constantes nécessaires pour création d'un nouveau User
    const [signUpPassword, setSignUpPassword] = useState('');
    const [signUpUsername, setSignUpUsername] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');

    const [listErrorsSignup, setErrorsSignup] = useState([])

    //Vérification de la bonne écriture des données des Inputs dans la console
    /*     console.log(signUpUsername); */

    const dispatch = useDispatch();
    const tokenUser = useSelector(state => state.token);

    //Au clic sur le Bouton Start on va récupérer les INPUT
    var handleSubmitSignup = async () => {

        const data = await fetch('http://192.168.1.28:3000/sign-up', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`
        })

        const body = await data.json()
        if (body.result == true) {
            dispatch({ type: 'addToken', token: body.saveUser.token })
            props.navigation.navigate('StackNavigation')
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

    if (tokenUser) {
        props.navigation.navigate('Map')
    } else {
        
        return (
            <View style={styles.container}>
                {/*Titre*/}
                <Text h2 style={{ color: '#FFFFFF', fontSize: 25, fontFamily: 'PressStart2P_400Regular' }}>Welcome new</Text>
                <Text h2 style={{ marginBottom: 25, color: '#06D4B6', fontSize: 25, fontFamily: 'PressStart2P_400Regular' }}>Veaziter</Text>

                {/*Input pour l'USERNAME'*/}
                <Input
                    onChangeText={(e) => setSignUpUsername(e)}
                    value={signUpUsername}
                    containerStyle={{ marginBottom: 25, width: '70%' }}
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
                    containerStyle={{ marginBottom: 25, width: '70%' }}
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
                    containerStyle={{ width: '70%' }}
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
                <TouchableOpacity style={styles.touchable} onPress={() => handleSubmitSignup()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Start</Text>
                    </View>
                </TouchableOpacity>

                {/*Redirection vers la page SIGN IN si l'USER possède un compte*/}
                <Text style={styles.text}>Si vous avez deja un compte:</Text>
                <Text style={styles.textConnect} onPress={() => props.navigation.navigate('SignIn')}>Connectez-vous</Text>
            </View >
        );
    }
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
        marginTop: 25,
        borderRadius: 30
    },
    buttonText: {
        color: "#06D4B6",
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "PressStart2P_400Regular"
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
        color: 'red'
    }
});
