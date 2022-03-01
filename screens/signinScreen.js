import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome5';

import {
    PressStart2P_400Regular
} from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useState } from 'react';

export default function signIn(props) {

    const [signInEmail, setSignInEmail] = useState('');
    const [signInPassword, setSignInPassword] = useState('');

    //Mise en place de la Font Press Start 2P ATTENTION - A DÉCLARER JUSTE AVANT LE RETURN DE LA FONCTION
    let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });
    if (!fontLoaded) {
        return <AppLoading />
    }

    return (
        <View style={styles.container}>
            <Text h2 style={{ color: '#FFFFFF', fontSize: 25, fontFamily:'PressStart2P_400Regular' }}>Welcome back</Text>
            <Text h2 style={{ marginBottom: 25, color: '#06D4B6', fontSize: 25, fontFamily:'PressStart2P_400Regular' }}>Veaziter</Text>
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
            <TouchableOpacity style={styles.touchable} onPress={() => props.navigation.navigate("StackNavigation")}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Let's Veazit</Text>
                </View>
            </TouchableOpacity>
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
});
