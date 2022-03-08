import { useContext } from 'react';

import { StyleSheet,  View, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import themeContext from '../config/themeContext';

export default function FavoriteScreen(props) {

  const theme = useContext(themeContext);

  return (

    <View style={[styles.content,{backgroundColor:theme.background}]}>
        <Text style={[styles.contentTitle,{color: theme.color}]}>Favorite Screen !</Text>

        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => props.navigation.navigate('StackNavigation', { screen: 'ConnectScreen' })}>
                <View style={[styles.buttonPrevious,{borderColor: theme.color}]}>
                    <Icon name='arrow-left' size={24} color={theme.color}/>
                </View>
            </TouchableOpacity>
        </View>
    </View>

    

  );
}

const styles = StyleSheet.create({
    content: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      contentTitle: {
        fontSize: 20,
        fontFamily: "PressStart2P_400Regular",
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
});