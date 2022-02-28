import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome5';

export default function connectScreen(props) {
    return (
        <View style={styles.container}>
            <Text h2 style={{ marginBottom: 25, color: '#FFFFFF', fontSize: 34 }}>Welcome New Veaziter </Text>
            <Input
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
            <Input
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
            <TouchableOpacity style={styles.touchable} onPress={() => props.navigation.navigate("HomeFilter")}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>START</Text>
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
        paddingTop: 30,
        borderRadius: 30
    },
    buttonText: {
        color: "#06D4B6",
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
