import { useState } from 'react';

import { StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import { Text, Button, Overlay } from 'react-native-elements';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUserAstronaut, faTrophy, faMapLocationDot, faFilter } from '@fortawesome/free-solid-svg-icons'
import {faFortAwesome} from '@fortawesome/free-brands-svg-icons'

import { PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import imageFond from '../assets/tuto.jpg'

export default function TutoScreen(props) {

    const [isVisible1, setIsVisible1] = useState(true)
    const [isVisible2, setIsVisible2] = useState(false)
    const [isVisible3, setIsVisible3] = useState(false)
    const [isVisible4, setIsVisible4] = useState(false)
    const [isVisible5, setIsVisible5] = useState(false)

    let [fontLoaded, error] = useFonts({ PressStart2P_400Regular });

    if (!fontLoaded) {
        return <AppLoading />
    }

    return (

        <View>
            <ImageBackground source={imageFond} style={styles.image} />

            <Overlay
                overlayStyle={styles.overlayStyle}
                isVisible={isVisible1}>

                <View style={styles.overlayTuto}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleWhite}>Tutorial </Text>
                        <Text style={styles.titleGreen}>Veazit & Play </Text>
                    </View>

                    <FontAwesomeIcon
                        icon={faMapLocationDot}
                        color='white'
                        size={75}
                        textAlign={'center'} />
                    <View>
                        <Text style={styles.textWhite}>Cette icône te montrera ta </Text>
                        <Text style={styles.textGreen}>Carte de Veazit</Text>
                    </View>

                    <Button
                        title={`1/5`}
                        containerStyle={{
                            width: '50%',
                            marginHorizontal: 50,
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: '#06D4B6',
                            marginTop: 20,
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
                        onPress={() => { setIsVisible1(false); setIsVisible2(true) }}
                    />
                    <Button
                        title={`Skip`}
                        containerStyle={{
                            width: '50%',
                            marginHorizontal: 50,
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: '#06D4B6',
                            marginTop: 20,
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
                        onPress={() => { setIsVisible1(false); props.navigation.navigate('StackNavigation') }}
                    />
                </View>
            </Overlay>

            <Overlay
                overlayStyle={styles.overlayStyle}
                isVisible={isVisible2}>

                <View style={styles.overlayTuto}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleWhite}>Tutorial</Text>
                        <Text style={styles.titleGreen}>Veazit & Play </Text>
                    </View>

                    <FontAwesomeIcon
                        icon={faFilter}
                        color='white'
                        size={75}
                        textAlign={'center'} />
                    <View>
                        <Text style={styles.textWhite}>Cette icône te montrera tes </Text>
                        <Text style={styles.textGreen}>Filtres de Veazit</Text>
                    </View>

                    <Button
                        title={`2/5`}
                        containerStyle={{
                            width: '50%',
                            marginHorizontal: 50,
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: '#06D4B6',
                            marginTop: 20,
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
                        onPress={() => { setIsVisible2(false); setIsVisible3(true) }}
                    />
                    <Button
                        title={`Skip`}
                        containerStyle={{
                            width: '50%',
                            marginHorizontal: 50,
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: '#06D4B6',
                            marginTop: 20,
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
                        onPress={() => { setIsVisible2(false); props.navigation.navigate('StackNavigation') }}
                    />
                </View>
            </Overlay>

            <Overlay
                overlayStyle={styles.overlayStyle}
                isVisible={isVisible3}>

                <View style={styles.overlayTuto}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleWhite}>Tutorial</Text>
                        <Text style={styles.titleGreen}>Veazit & Play </Text>
                    </View>

                    <FontAwesomeIcon
                        icon={faFortAwesome}
                        color='white'
                        size={75}
                        textAlign={'center'} />
                    <View>
                        <Text style={styles.textWhite}>Cette icône te montrera des </Text>
                        <Text style={styles.textGreen}>Quetes de Veazit</Text>
                    </View>

                    <Button
                        title={`3/5`}
                        containerStyle={{
                            width: '50%',
                            marginHorizontal: 50,
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: '#06D4B6',
                            marginTop: 20,
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
                        onPress={() => { setIsVisible3(false); setIsVisible4(true) }}
                    />
                    <Button
                        title={`Skip`}
                        containerStyle={{
                            width: '50%',
                            marginHorizontal: 50,
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: '#06D4B6',
                            marginTop: 20,
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
                        onPress={() => { setIsVisible3(false); props.navigation.navigate('StackNavigation') }}
                    />
                </View>
            </Overlay>

            <Overlay
                overlayStyle={styles.overlayStyle}
                isVisible={isVisible4}>

                <View style={styles.overlayTuto}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleWhite}>Tutorial</Text>
                        <Text style={styles.titleGreen}>Veazit & Play </Text>
                    </View>

                    <FontAwesomeIcon
                        icon={faTrophy}
                        color='white'
                        size={75}
                        textAlign={'center'} />
                    <View>
                        <Text style={styles.textWhite}>Cette icône te montrera tes </Text>
                        <Text style={styles.textGreen}>Trophées</Text>
                    </View>

                    <Button
                        title={`4/5`}
                        containerStyle={{
                            width: '50%',
                            marginHorizontal: 50,
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: '#06D4B6',
                            marginTop: 20,
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
                        onPress={() => { setIsVisible4(false); setIsVisible5(true) }}
                    />
                    <Button
                        title={`Skip`}
                        containerStyle={{
                            width: '50%',
                            marginHorizontal: 50,
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: '#06D4B6',
                            marginTop: 20,
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
                        onPress={() => { setIsVisible4(false); props.navigation.navigate('StackNavigation') }}
                    />
                </View>
            </Overlay>

            <Overlay
                overlayStyle={styles.overlayStyle}
                isVisible={isVisible5}>

                <View style={styles.overlayTuto}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleWhite}>Tutorial</Text>
                        <Text style={styles.titleGreen}>Veazit & Play </Text>
                    </View>

                    <View>
                        <FontAwesomeIcon
                            icon={faUserAstronaut}
                            color='white'
                            size={75}
                            textAlign={'center'} />
                    </View>

                    <View>
                        <Text style={styles.textWhite}>Cette icône te montrera ton </Text>
                        <Text style={styles.textGreen}>Profil Veaziter</Text>
                    </View>

                    <Button
                        title={`Start Veazit`}
                        containerStyle={{
                            width: '50%',
                            marginHorizontal: 50,
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: '#06D4B6',
                            marginTop: 20,
                        }}
                        buttonStyle={{
                            backgroundColor: "#2C3A47",
                            height: 50,
                        }}
                        titleStyle={{
                            fontFamily: "PressStart2P_400Regular",
                            fontSize: 15,
                            color: "#06D4B6",
                        }}
                        onPress={() => { setIsVisible5(false); props.navigation.navigate('StackNavigation') }}
                    />
                    <Button
                        title={`Skip`}
                        containerStyle={{
                            width: '50%',
                            marginHorizontal: 50,
                            borderRadius: 30,
                            borderWidth: 1,
                            borderColor: '#06D4B6',
                            marginTop: 20,
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
                        onPress={() => { setIsVisible5(false); props.navigation.navigate('StackNavigation') }}
                    />
                </View>
            </Overlay>
        </View>


    );
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    overlayTuto: {
        width: 300,
        height: 500,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#2C3A47',
        opacity: 1,
    },
    titleContainer: {
        marginTop: 20,
    },
    titleWhite: {
        color: 'white',
        fontSize: 30,
        textAlign: 'center',
        paddingHorizontal: 5,
    },
    titleGreen: {
        color: '#06D4B6',
        fontSize: 18,
        textAlign: 'center',
        paddingHorizontal: 5,
        paddingTop: 10,
        fontFamily: "PressStart2P_400Regular"
    },
    textWhite: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 10
    },
    textGreen: {
        color: '#06D4B6',
        fontSize: 16,
        textAlign: 'center',
        fontFamily: "PressStart2P_400Regular"
    },
    icone: {
        textAlign: 'center',
        justifyContent: 'center'
    },
    overlayStyle:{
        padding:0, 
        borderWidth:2,
        borderColor:"#06D4B6"
    }
});
