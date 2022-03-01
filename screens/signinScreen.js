import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome5';

import {
    PressStart2P_400Regular
} from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useState } from 'react';
import { useSelector } from 'react-redux';

export default function signinScreen(props) {
    let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });
export default function signIn(props) {

    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    const [listErrorsSignin, setErrorsSignin] = useState([]);

    const tokenUser = useSelector(state => state.token);

    var handleSubmitSignin = async () => {

        const data = await fetch('http://172.16.189.9:3000/sign-in', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
        })

        const body = await data.json()
        console.log(body);

        if (body.result == true) {
            props.navigation.navigate('Map')
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

    if (tokenUser) {
        props.navigation.navigate('Map')
    } else {
        return (
            <View style={styles.container}>
                <Text h2 style={{ color: '#FFFFFF', fontSize: 25, fontFamily: 'PressStart2P_400Regular' }}>Welcome back</Text>
                <Text h2 style={{ marginBottom: 25, color: '#06D4B6', fontSize: 25, fontFamily: 'PressStart2P_400Regular' }}>Veaziter</Text>
                <Input
                    onChangeText={(e) => setSignInEmail(e)}
                    value={signInEmail}
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
                <Input
                    onChangeText={(e) => setSignInPassword(e)}
                    value={signInPassword}
                    containerStyle={{ marginBottom: 25, width: '70%' }}
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

                <TouchableOpacity style={styles.touchable} onPress={() => handleSubmitSignin()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Let's Veazit</Text>
                    </View>
                </TouchableOpacity>
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
        borderRadius: 30
    },
    buttonText: {
        color: "#06D4B6",
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "PressStart2P_400Regular"
    },
    error: {
        color: 'red'
    },

})}
